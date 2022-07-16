<script lang="ts">
	import Battle from '$lib/components/Battle.svelte';
	import StartScreen from '$lib/components/StartScreen.svelte';
	import Store from '$lib/components/Store.svelte';
	import { globalGameState, EGlobalStates } from '$lib/store';

	const fixedWindowSize = 1280;

	let innerWidth = 0;
	let innerHeight = 0;

	$: scale = innerWidth / fixedWindowSize;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<main style={`width: ${fixedWindowSize}px; transform: scale(${scale})`}>
	{#if $globalGameState === EGlobalStates.START_SCREEN}
		<StartScreen />
	{:else if $globalGameState === EGlobalStates.BATTLE}
		<Battle />
	{/if}
</main>

<style>
	main {
		transform-origin: 0 0;
		position: fixed;
		top: 0;
		left: 0;
		aspect-ratio: 16/9;
		background-color: gray;
	}
</style>
