<script lang="ts">
	import PlayerDisplay from '$lib/components/PlayerDisplay.svelte';
	import { player, enemy } from '$lib/store';

	let isFastFording = false;
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
		<PlayerDisplay {player} />
		<PlayerDisplay player={enemy} />
	</div>
</div>

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
