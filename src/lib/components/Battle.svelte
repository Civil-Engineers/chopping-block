<script lang="ts">
	import PlayerDisplay from '$lib/components/PlayerDisplay.svelte';
	import Shop from './Shop.svelte';
	import { player, enemies, setEnemiesToWave } from '$lib/store';
	import { sleep } from '$lib/helper';

	let isFastFording = false;
	let wave = 0;

	const battleLoop = async () => {
		// your turn -------

		console.log('loop');

		// your dice roll
		await sleep(1000);
		// show reuslt
		await sleep(1000);
		// do ability to enemy

		await sleep(1000);

		// enemy turn -------

		// all enemies roll at the same time
		await sleep(1000);
		// show reuslt of enemy
		await sleep(1000);
		// do ability to player
		await sleep(1000);

		// loop many times until all enemies die or you die
		if ($player.health > 0 || $enemies.length > 0) {
			battleLoop();
		}
	};

	battleLoop();

	// wait speed in milliseconds
	let waitSpeed = 1000;
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

<audio src="shopper.mp3" type="audio/mpeg" autoplay></audio>

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
