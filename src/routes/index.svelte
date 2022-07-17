<script lang="ts">
	import { browser } from '$app/env';
	import AudioPlayer from '$lib/components/AudioPlayer.svelte';

	import Battle from '$lib/components/Battle.svelte';
	import StartScreen from '$lib/components/StartScreen.svelte';
	import { preload } from '$lib/helper';
	import { globalGameState, EGlobalStates } from '$lib/store';

	const fixedWindowSizeW = 1280;
	const fixedWindowSizeH = 720;

	let innerWidth = 0;
	let innerHeight = 0;

	$: wide = innerHeight / innerWidth > fixedWindowSizeH / fixedWindowSizeW;

	$: scale = wide ? innerWidth / fixedWindowSizeW : innerHeight / fixedWindowSizeH;

	// $: leftIndent = (innerWidth > fixedWindowSizeW) ? (innerWidth - fixedWindowSizeW)/2 : 0;
	// $: topIndent =  (innerWidth <= fixedWindowSizeW) ? (fixedWindowSizeW - innerWidth)/4 : 0;


	if (browser) {
		preload([
			'/test.jpg',
			'/images/Catfish.png',
			'/images/Eel.png',
			'/images/Fish_Goon.png',
			'/images/Fisher.png',
			'/images/Piranha.png'
		]);
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<main style={`width: ${fixedWindowSizeW}px; transform: scale(${scale}) `}>
	{#if $globalGameState === EGlobalStates.START_SCREEN}
		<StartScreen />
	{:else if $globalGameState === EGlobalStates.BATTLE}
		<Battle />
	{/if}
	<AudioPlayer />
</main>

<style>
	main {
		overflow: hidden;
		transform-origin: 0 0;
		position: fixed;
		top: 0;
		left: 0;
		aspect-ratio: 16/9;
		background-color: gray;
	}
</style>
