<script lang="ts">
	import { getRandomAbility, sleep } from '$lib/helper';

	import { EAnimationStates, type IPlayer } from '$lib/store';
	import type { Writable } from 'svelte/store';
	import Dice from './Dice.svelte';
	import DiceContainer from './DiceContainer.svelte';
	import HealthBar from './HealthBar.svelte';
	import RolledDice from './RolledDice.svelte';

	export let player: IPlayer;

	export let isEnemy: boolean = false;

	let particles: number[] = [];

	let oldHealth = player.health;

	const resetState = async () => {
		if (player.animationState !== EAnimationStates.IDLE) {
			await sleep(500);
			player.animationState = EAnimationStates.IDLE;
		}
	};

	const healthDelta = () => {
		const delta = player.health - oldHealth;
		oldHealth = player.health;

		if (delta != 0) {
			particles.push(delta);
			while (particles.length > 100) {
				particles.shift();
			}
			particles = particles;
		}
	};

	$: player.health, healthDelta();
	$: player.animationState, resetState();
</script>

<div class="player-slot">
	<DiceContainer playerDice={player.dice} />
	<div class="player" class:is-enemy={isEnemy}>
		{#each particles as particle}
			<div class="particle">
				<div
					class:damage={particle < 0}
					style={`transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 6 - 3}px)`}
				>
					{particle}
				</div>
			</div>
		{/each}
		<img
			src={player.animations[player.animationState] ?? player.animations[EAnimationStates.IDLE]}
			alt=""
		/>
		<HealthBar maxHealth={player.maxHealth} health={player.health} poison={player.poison} block={player.poison}/>
	</div>
</div>

<style lang="scss">
	.player-slot {
		// background: rgb(100, 100, 100);
		flex: 1;
		width: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		padding-bottom: 15px;
	}
	.player {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		position: relative;
		> img {
			object-fit: contain;
			object-position: 50% 100%;
			margin-top: -130px;
			margin-right: -250px;
			width: 450px;
			height: 450px;
			display: block;
			pointer-events: none;
			animation-duration: 1s;
			animation-name: idle-bob;
			animation-timing-function: ease;
			animation-iteration-count: infinite;
			animation-play-state: running;
			transform-origin: 50% 100%;
		}
		&.is-enemy {
			> img {
				margin-right: 140px;
				margin-top: -180px;
				width: 500px;
				height: 500px;
			}
		}
	}
	.particle {
		> div {
			width: 50px;
			height: 50px;
			background-color: lightblue;
			border-radius: 25%;
			display: flex;
			align-items: center;
			font-size: 20px;
			justify-content: center;
			
			&.damage {
				background-color: pink;
			}
		}
		position: absolute;
		bottom: 300px;

		animation-duration: 5s;
		animation-name: foat-up;
		animation-timing-function: ease;
		animation-fill-mode: forwards;
		animation-iteration-count: 1;
		animation-play-state: running;
	}

	@keyframes foat-up {
		0% {
			transform: translateY(0);
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translateY(-200px);
		}
	}
	@keyframes idle-bob {
		0% {
			transform: scale(1.05, 0.95);
		}
		50% {
			transform: scale(0.95, 1.05);
		}
		100% {
			transform: scale(1.05, 0.95);
		}
	}
</style>
