<script lang="ts">
	import type { IDice, IFace } from '$lib/store';
	import Dice from './Dice.svelte';
	import { fade } from 'svelte/transition';

	export let face: IFace;
	export let dice: IDice;

	let hover = false;
	$: console.log(face.ability.icon);
</script>

<div class="con" on:mouseenter={() => (hover = true)} on:mouseleave={() => (hover = false)}>
	{#if hover}
		<div class="tool-tip" transition:fade>
			<Dice {dice} />
		</div>
	{/if}
	<div class="icon">
		<img src={face.ability.icon} alt="" />
		<p>{face.ability.value}</p>
	</div>
</div>

<style lang="scss">
	.con {
		position: relative;
	}
	.tool-tip {
		position: absolute;
		top: -70px;
		left: 50%;
		transform: translateX(-50%);
	}
	.icon {
		width: 200px;
		height: 200px;
		position: relative;
		> img {
			width: 100%;
			height: 100%;
		}
		> p {
			position: absolute;
			bottom: 30px;
			margin: 0;
			right: 50px;
			color: white;
			font-size: 50px;
			text-shadow: -2px -2px 0 #391302, 2px -2px 0 #391302, -2px 2px 0 #391302, 2px 2px 0 #391302;
		}
	}
</style>
