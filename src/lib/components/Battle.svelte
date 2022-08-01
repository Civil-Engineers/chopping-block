<script lang="ts">
	import PlayerDisplay from '$lib/components/PlayerDisplay.svelte';
	import Shop from './Shop.svelte';
	import { EGlobalStates, isShopping, globalGameState, playAudio, newAbility, resetTempBonus, type IDice, type IFace } from '$lib/store';
	import {
		player,
		enemies,
		setEnemiesToWave,
		waveInitEnemies,
		shopPhase,
		beRolling,
		type IAbility,
		type IPlayer,
		EAnimationStates
	} from '$lib/store';
	import { rollDice, sleep } from '$lib/helper';

	let isFastFording = false;
	let wave = 0;

	setEnemiesToWave(wave);

	$enemies.forEach((enemy) => {
		enemy.dice.forEach((dice) => {
			enemy.block = 0;
			const rolledNumber = rollDice(dice.faces.length);
			dice.rolled = dice.faces[rolledNumber];
			$enemies = $enemies;
		});
	});

	const battleLoop = async () => {
		if ($enemies.length === 0) {
			return;
		}

		// your turn -------
		$beRolling = true;

		// your dice roll
		await sleep(waitSpeed*1.5);
		$beRolling = false;
		await sleep(.2);
		playAudio('/music/dice-roll.wav');
		$player.dice.forEach((dice, index) => {
			$player.block = 0;
			const rolledNmber = rollDice(dice.faces.length);
			dice.rolled = dice.faces[rolledNmber];
			$player = $player;
		});
		$enemies.forEach((enemy) => {
			enemy.block = 0;
			enemy.dice.forEach((dice) => {
				const rolledNumber = rollDice(dice.faces.length);
				dice.rolled = dice.faces[rolledNumber];
				enemy.block += dice.rolled.ability.block ?? 0;
				$enemies = $enemies;
			});
		});

		// do ability to enemy
		await sleep(waitSpeed);
		attack($player, $enemies[0]);
		for(const d of $player.dice) {
			dicePostAttack(d);
		}
		await sleep(waitSpeed*2.7);
		$enemies = $enemies.filter((enemy) => enemy.health > 0);
		$player = $player;
		$enemies = $enemies;

		// enemy turn -------

		// all enemies roll at the same time
		await sleep(waitSpeed*2);

		// do ability to player
		for (let i = 0; i < $enemies.length; i++) {
			attack($enemies[i], $player);
			$player = $player;
			$enemies = $enemies;
			await sleep(waitSpeed);
		}
		$enemies = $enemies.filter((enemy) => enemy.health > 0);

		await sleep(waitSpeed*2.2);
		// loop many times until all enemies die or you die
		if ($player.health > 0 && $enemies.length > 0) {
			battleLoop();
		} else if ($player.health <= 0) {
			$globalGameState = EGlobalStates.LOSE;
		} else {
			resetTempBonus($player);
			wave++;
			if (wave < waveInitEnemies.length) {
				setEnemiesToWave(wave);
				$shopPhase = true;
				$player.gold += 10;
				let sum = 0;
				$player.dice.forEach((dice) => {
					dice.faces.forEach((face) => {
						sum += face.ability.gold;
					});
				});
				$player.gold += sum;
				// $player.health = $player.maxHealth;
				$isShopping = true;

				$enemies.forEach((enemy) => {
					enemy.dice.forEach((dice) => {
						enemy.block = 0;
						const rolledNumber = rollDice(dice.faces.length);
						dice.rolled = dice.faces[rolledNumber];
						$enemies = $enemies;
					});
				});
			} else {
				// WIN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				$globalGameState = EGlobalStates.WIN;
			}
		}
	};

	shopPhase.subscribe((value) => {
		if (value === false) {
			battleLoop();
		}
	});

	// battleLoop();
	const dicePostAttack = (dice: IDice) => {
		if(dice.rolled?.ability.grow) {
			dice.rolled.temp_bonus	= mergeAbilities(dice.rolled.ability.grow, dice.rolled.temp_bonus)
		}
		// if(dice.rolled?.ability.rolling) {
		// 	// animation?
			
		// }
	}

	const mergeAbilities = (a1:IAbility, a2:IAbility) => {
		const mergedAbility:IAbility = newAbility({
			damage: a1.damage + a2.damage,
			cleaveDamage: a1.cleaveDamage + a2.cleaveDamage,
			block: a1.block + a2.block,
			heal: a1.heal + a2.heal,
			healAll: a1.healAll + a2.healAll,
			poison: a1.poison + a2.poison,
			multiplier: a1.multiplier + a2.multiplier,
		});
		return mergedAbility;
	}

	const attack = (attacker: IPlayer, target: IPlayer) => {
		// dice merge
		const mergedAbility = {
			damage: attacker.dice.reduce((sum, dice) => (sum += (dice.rolled?.ability.damage ?? 0) + (dice.rolled?.temp_bonus?.damage ?? 0)), 0),
			cleaveDamage: attacker.dice.reduce(
				(sum, dice) => (sum += (dice.rolled?.ability.cleaveDamage ?? 0) + (dice.rolled?.temp_bonus?.cleaveDamage ?? 0)),
				0
			),
			goldDamage: attacker.dice.reduce(
				(sum, dice) => (sum += dice.rolled?.ability.goldAtt ? $player.gold : 0),
				0
			),
			block: attacker.dice.reduce((sum, dice) => (sum += (dice.rolled?.ability.block) ?? 0 + (dice.rolled?.temp_bonus?.block ?? 0)), 0),
			heal: attacker.dice.reduce((sum, dice) => (sum += (dice.rolled?.ability.heal ?? 0)+ (dice.rolled?.temp_bonus?.heal ?? 0)), 0),
			healAll: attacker.dice.reduce((sum, dice) => (sum += (dice.rolled?.ability.healAll ?? 0) + (dice.rolled?.temp_bonus?.healAll ?? 0)), 0),
			poison: attacker.dice.reduce((sum, dice) => (sum += (dice.rolled?.ability.poison ?? 0) + (dice.rolled?.temp_bonus?.poison ?? 0)), 0),
			multiplier: attacker.dice.reduce(
				(product, dice) => (product *= (dice.rolled?.ability.multiplier ?? 1) * (dice.rolled?.temp_bonus?.multiplier ?? 1)),
				1
			)
		};

		let damage = (mergedAbility.damage + mergedAbility.goldDamage) * mergedAbility.multiplier;
		if (damage > 0) {
			damage =
				(mergedAbility.damage + mergedAbility.goldDamage) * mergedAbility.multiplier -
				target.block;
			damage = damage < 0 ? 0 : damage;
		}

		target.poison += mergedAbility.poison;

		target.health -= damage;
		target.health = target.health < 0 ? 0 : target.health;

		let cleaveDamage = (mergedAbility.cleaveDamage) * mergedAbility.multiplier;
		if (cleaveDamage > 0) {
			$enemies.forEach((enemy) => {
				let targetCleaveDamage = mergedAbility.cleaveDamage * mergedAbility.multiplier - target.block;
				targetCleaveDamage = cleaveDamage < 0 ? (cleaveDamage = 0) : cleaveDamage;
				enemy.health -= targetCleaveDamage;
				enemy.health = enemy.health < 0 ? 0 : enemy.health;
			});
		}

		if (mergedAbility.healAll > 0) {
			$enemies.forEach((enemy) => {
				if(enemy.health) {
					enemy.health += mergedAbility.healAll;
					enemy.health = enemy.health > enemy.maxHealth ? enemy.maxHealth : enemy.health;
					enemy.health = enemy.health < 0 ? 0 : enemy.health;
				}
			});
		}

		attacker.health += mergedAbility.heal;
		attacker.health = attacker.health > attacker.maxHealth ? attacker.maxHealth : attacker.health;
		attacker.health = attacker.health < 0 ? 0 : attacker.health;
		
		attacker.health -= attacker.poison;
		attacker.health = attacker.health > attacker.maxHealth ? attacker.maxHealth : attacker.health;
		attacker.health = attacker.health < 0 ? 0 : attacker.health;
		
		attacker.poison = Math.max(attacker.poison-1, 0);

		attacker.block = mergedAbility.block;
		attacker.animationState = EAnimationStates.ATTACK;
	};

	// wait speed in milliseconds
	$: waitSpeed = isFastFording ? 200 : 400;
</script>

<div class="container">
	<div class="fast" on:click={() => (isFastFording = !isFastFording)}>
		{#if isFastFording}
			<div class="regular-speed">
				<img src={'/images/Play.png'} alt="Regular Speed" />
				<span>regular speed</span>
			</div>
		{:else}
			<div class="fast-forward">
				<img src={'images/Fast_Forward.png'} alt="Fast Forward" />
				<span>fast forward</span>
			</div>
		{/if}
	</div>
	<div class="main">
		<PlayerDisplay bind:player={$player} />
		{#each $enemies as enemy}
			<PlayerDisplay bind:player={enemy} isEnemy={true} />
		{/each}
		<Shop bind:player={$player} />
	</div>
</div>

{#if wave == 9}
	<audio src="/music/boss_shit.mp3" type="audio/mpeg" autoplay loop />
{:else if !$shopPhase}
	<audio src="/music/battle1.mp3" type="audio/mpeg" autoplay loop />
{/if}

<style type="scss">
	.fast {
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgba(128, 128, 128, 0.85);
		padding: 0.5rem;
		border-radius: 10px;
		&:hover {
			cursor: pointer;
		}

		* {
			display: flex;
			align-items: center;

			img {
				width: 2.5rem;
			}
		}
	}
	.container {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-image: url('/images/Backup_Layout.png');
	}
	.main {
		display: flex;
		width: 100%;
		height: 100%;
	}
</style>
