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
	const diceLoop = async () => {
		if($beRolling) {
			currRoll = dice.faces[Math.floor(Math.random() * 5 + 1)];
			rampTime = rampTime + 5;
			xMargin = Math.floor(Math.random() * 20 - 10);
			yMargin = Math.floor(Math.random() * 20 - 10);
		} else {
			xMargin = 0;
			yMargin = 0;
		}
		await sleep(10);
		diceLoop();
	};
	diceLoop();
</script>


<div class="con" style={`transform: translate(${xMargin}px, ${yMargin}px)`} on:mouseenter={() => (hover = true)} on:mouseleave={() => (hover = false)}>
	{#if hover}
		<div class="tool-tip" transition:fade>
			<Dice {dice} />
		</div>
	{/if}
	{#if $beRolling}
		<TileFaceIcon icon={currRoll.ability.icon} value={currRoll.ability.value} />
	{:else}
		<TileFaceIcon icon={face.ability.icon} value={face.ability.value} />
	{/if}
</div>

<style lang="scss">
	.con {
		position: relative;
	}
	.tool-tip {
		position: absolute;
		top: -130px;
		left: 50%;
    z-index: 10;
		transform: translateX(-50%);
	}
</style>
