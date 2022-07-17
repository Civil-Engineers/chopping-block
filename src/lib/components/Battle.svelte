<script lang="ts">
	import PlayerDisplay from '$lib/components/PlayerDisplay.svelte';
	import Shop from './Shop.svelte';
	import {
		player,
		enemies,
		setEnemiesToWave,
		waveInitEnemies,
		type IAbility,
		type IPlayer,
		EAnimationStates
	} from '$lib/store';
	import { rollDice, sleep } from '$lib/helper';

	let isFastFording = false;
	let wave = 0;

	const battleLoop = async () => {
		if ($enemies.length === 0) {
			return;
		}

		// your turn -------

		// your dice roll
		await sleep(waitSpeed);
		$player.dice.forEach((dice, index) => {
			const rolledNmber = rollDice(dice.faces.length);
			dice.rolled = dice.faces[rolledNmber];
			$player = $player;
		});

		// do ability to enemy
		await sleep(waitSpeed);

		attack($player, $enemies[0]);
		$enemies = $enemies.filter((enemy) => enemy.health > 0);
		$player = $player;
		$enemies = $enemies;

		// enemy turn -------

		// all enemies roll at the same time
		await sleep(waitSpeed);
		$enemies.forEach((enemy) => {
			enemy.dice.forEach((dice) => {
				const rolledNumber = rollDice(dice.faces.length);
				dice.rolled = dice.faces[rolledNumber];
				$enemies = $enemies;
			});
		});

		// do ability to player
		await sleep(waitSpeed);
		$enemies.forEach((enemy) => {
			attack(enemy, $player);
			$player = $player;
			$enemies = $enemies;
		});
		$enemies = $enemies.filter((enemy) => enemy.health > 0);

		// loop many times until all enemies die or you die
		if ($player.health > 0 && $enemies.length > 0) {
			battleLoop();
		} else {
			wave++;
			if (wave < waveInitEnemies.length) {
				setEnemiesToWave(wave);
			} else {
				// WIN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			}
		}
	};

	battleLoop();

	const attack = (attacker: IPlayer, target: IPlayer) => {
		// dice merge
		const mergedAbility = {
			damage: attacker.dice.reduce((sum, dice) => (sum += dice.rolled?.ability.damage ?? 0), 0),
			defense: attacker.dice.reduce((sum, dice) => (sum += dice.rolled?.ability.defense ?? 0), 0),
			heal: attacker.dice.reduce((sum, dice) => (sum += dice.rolled?.ability.heal ?? 0), 0),
			poison: attacker.dice.reduce((sum, dice) => (sum += dice.rolled?.ability.poison ?? 0), 0),
			multiplier: attacker.dice.reduce(
				(product, dice) => (product *= dice.rolled?.ability.multiplier ?? 1),
				1
			)
		};

		target.health -= mergedAbility.damage * mergedAbility.multiplier;
		target.health = target.health > target.maxHealth ? target.maxHealth : target.health;
		target.health = target.health < 0 ? 0 : target.health;

		attacker.health += mergedAbility.heal;
		attacker.health = attacker.health > attacker.maxHealth ? attacker.maxHealth : attacker.health;
		attacker.health = attacker.health < 0 ? 0 : attacker.health;

		attacker.defense = mergedAbility.defense;

		attacker.animationState = EAnimationStates.ATTACK;
	};

	// wait speed in milliseconds
	$: waitSpeed = isFastFording ? 100 : 250;
</script>

<div class="container">
	<button class="fast" on:click={() => (isFastFording = !isFastFording)}>
		{#if isFastFording}
			regular speed
		{:else}
			fast forward
		{/if}
	</button>
	<div class="main">
		<PlayerDisplay bind:player={$player} />
		{#each $enemies as enemy}
			<PlayerDisplay bind:player={enemy} />
		{/each}
		<Shop />
	</div>
</div>

<audio src="shopper.mp3" type="audio/mpeg" autoplay />

<style>
	.fast {
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
	}
	.container {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.main {
		display: flex;
		width: 100%;
		height: 100%;
	}
</style>
