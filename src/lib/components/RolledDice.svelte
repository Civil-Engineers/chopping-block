<script lang="ts">
	import type { IDice, IFace } from '$lib/store';
	import { sleep } from '$lib/helper';
	import Dice from './Dice.svelte';
	import { fade } from 'svelte/transition';
	import TileFaceIcon from './TileFaceIcon.svelte';
	import {beRolling} from '$lib/store';

	export let face: IFace;
	export let dice: IDice;

	let hover = false;
	let currRoll:IFace = dice.faces[Math.floor(Math.random() * 5 + 1)];
	let rampTime = 10;
	let xMargin = 0;
    let yMargin = 0;
	let shakeDist = 10;
	let shakeConst = 12;

	const randomSign = () => {
		return Math.random() < 0.5 ? 1 : -1;
	}

	const diceLoop = async () => {
		if($beRolling) {
			currRoll = dice.faces[Math.floor(Math.random() * 5 + 1)];
			rampTime = rampTime + 5;
			xMargin = Math.floor(Math.random() * shakeDist + shakeConst) * randomSign();
			yMargin = Math.floor(Math.random() * shakeDist + shakeConst) * randomSign();
		} else {
			xMargin = 0;
			yMargin = 0;
		}
		await sleep(35);
		diceLoop();
	};
	diceLoop();
</script>


<div class="con" class:is-rolling={$beRolling} style={`transform: translate(${xMargin}px, ${yMargin}px)`} on:mouseenter={() => (hover = true)} on:mouseleave={() => (hover = false)}>
	{#if hover}
		<div class="tool-tip" transition:fade>
			<Dice {dice} />
		</div>
	{/if}
	{#if $beRolling}
		<TileFaceIcon ability = {currRoll.ability}  temp={currRoll.temp_bonus} />
	{:else}
		<TileFaceIcon ability = {face.ability}  temp={face.temp_bonus} />
	{/if}
</div>

<style lang="scss">
	.con {
		position: relative;
	}
	.is-rolling {
		filter: brightness(60%);
	}
	.tool-tip {
		position: absolute;
		top: -130px;
		left: 50%;
    z-index: 10;
		transform: translateX(-50%);
	}
</style>
