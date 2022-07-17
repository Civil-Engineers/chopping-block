<script lang="ts">
	import type { IDice, IFace } from '$lib/store';
	import Dice from './Dice.svelte';
	import { fade } from 'svelte/transition';
	import TileFaceIcon from './TileFaceIcon.svelte';

	export let face: IFace;
	export let dice: IDice;

	let hover = false;
</script>

<div class="con" on:mouseenter={() => (hover = true)} on:mouseleave={() => (hover = false)}>
	{#if hover}
		<div class="tool-tip" transition:fade>
			<Dice {dice} />
		</div>
	{/if}
	<TileFaceIcon icon={face.ability.icon} value={face.ability.value} />
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
