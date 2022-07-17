<script lang="ts">
	import { sleep } from '$lib/helper';

	import { EAnimationStates, type IPlayer } from '$lib/store';
	import type { Writable } from 'svelte/store';
	import Dice from './Dice.svelte';
	import HealthBar from './HealthBar.svelte';
	import RolledDice from './RolledDice.svelte';

	export let player: IPlayer;

	const resetState = async () => {
		await sleep(500);
		player.animationState = EAnimationStates.IDLE;
	};

	$: player.animationState, resetState();
</script>

<div class="player-slot">
	<div class="player">
		<HealthBar maxHealth={player.maxHealth} health={player.health} />
		<div>
			{#each player.dice as dice}
				<Dice {dice} />
				{#if dice.rolled}
					<RolledDice face={dice.rolled} />
				{/if}
			{/each}
		</div>
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
			object-fit: cover;
			width: 100px;
			height: 100px;
			display: block;
			animation-duration: 1s;
			animation-name: idle-bob;
			animation-timing-function: ease;
			animation-iteration-count: infinite;
			animation-play-state: running;
			transform-origin: 50% 100%;
		}
	}

	@keyframes idle-bob {
		0% {
			transform: scale(1.05, .95);
		}
		50% {
			transform: scale(.95, 1.05);
		}
		100% {
			transform: scale(1.05, .95);
		}
	}
</style>
