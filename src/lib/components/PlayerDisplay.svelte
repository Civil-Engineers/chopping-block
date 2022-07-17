<script lang="ts">
	import { sleep } from '$lib/helper';

	import { EAnimationStates, type IPlayer } from '$lib/store';
	import type { Writable } from 'svelte/store';
	import Dice from './Dice.svelte';
	import DiceContainer from './DiceContainer.svelte';
	import HealthBar from './HealthBar.svelte';
	import RolledDice from './RolledDice.svelte';

	export let player: IPlayer;

	export let isEnemy: boolean = false;

	const resetState = async () => {
		if (player.animationState !== EAnimationStates.IDLE) {
			await sleep(500);
			player.animationState = EAnimationStates.IDLE;
		}
	};

	$: player.animationState, resetState();
</script>

<div class="player-slot">
	<div class="player" class:is-enemy={isEnemy}>
		<HealthBar maxHealth={player.maxHealth} health={player.health} />
		<DiceContainer playerDice={player.dice} />
		<img
			src={player.animations[player.animationState] ?? player.animations[EAnimationStates.IDLE]}
			alt=""
		/>
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
		padding-bottom: 40px;
	}
	.player {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		> img {
			object-fit: contain;
			object-position: 50% 100%;
			margin-top: -130px;
			margin-right: -150px;
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
				margin-right: 100px;
				margin-top: -180px;
				width: 500px;
				height: 500px;
			}
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
