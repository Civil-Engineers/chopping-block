<script lang="ts">
	import { browser } from '$app/env';
	import AudioPlayer from '$lib/components/AudioPlayer.svelte';

	import Battle from '$lib/components/Battle.svelte';
	import Instructions from '$lib/components/Instructions.svelte';
	import LoseScreen from '$lib/components/LoseScreen.svelte';
	import StartScreen from '$lib/components/StartScreen.svelte';
	import WinScreen from '$lib/components/WinScreen.svelte';
	import { preload } from '$lib/helper';
	import { globalGameState, EGlobalStates } from '$lib/store';

	const fixedWindowSizeW = 1280;
	const fixedWindowSizeH = 720;

	let innerWidth = 0;
	let innerHeight = 0;

	$: wide = innerHeight / innerWidth > fixedWindowSizeH / fixedWindowSizeW;

	$: scale = wide ? innerWidth / fixedWindowSizeW : innerHeight / fixedWindowSizeH;

	$: leftIndent = wide ? 0 : (innerWidth - fixedWindowSizeW*scale)/2;
	$: topIndent =  wide ? (innerHeight - fixedWindowSizeH*scale)/2 : 0;

	if (browser) {
		preload([
			'/test.jpg',
			'/images/Attack_Icon.png',
			'/images/Backup_Layout.png',
			'/images/Blank_Icon.png',
			'/images/Catfish.png',
			'/images/Catfish_Attack.png',
			'/images/Cleave_Icon.png',
			'/images/Eel.png',
			'/images/Eel_Attack.png',
			'/images/Fast_Forward.png',
			'/images/Fish_Goon.png',
			'/images/Fish_Goon_Attack.png',
			'/images/Fisher.png',
			'/images/Fisher_Attack.png',
			'/images/Gold.png',
			'/images/Gold_Icon.png',
			'/images/Heal_all_Icon.png',
			'/images/Heal_Icon.png',
			'/images/Midas_Icon.png',
			'/images/Multiply_Icon.png',
			'/images/Piranha.png',
			'/images/Piranha_Attack.png',
			'/images/Play.png',
			'/images/Reroll.png',
			'/images/Shield_Icon.png',
			'/images/Start_battle.png',
		]);
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<main style={`width: ${fixedWindowSizeW}px; margin-left: ${leftIndent}px; margin-top: ${topIndent}px; transform: scale(${scale}) `}>
	{#if $globalGameState === EGlobalStates.START_SCREEN}
		<StartScreen />
	{:else if $globalGameState === EGlobalStates.INSTRUCTIONS}
		<Instructions />
	{:else if $globalGameState === EGlobalStates.BATTLE}
		<Battle />
	{:else if $globalGameState === EGlobalStates.WIN}
		<WinScreen />
	{:else if $globalGameState === EGlobalStates.LOSE}
		<LoseScreen />
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
