<script lang="ts">
	import type { IFace } from '$lib/store';
	import DiceFace from './DiceFace.svelte';

	export let face: IFace;
	// $: scale = health / maxHealth * 100;
</script>

<div class="face" />

<style>
	.container {
		height: 50px;
		width: 200px;
		background-color: blue;
		position: relative;
		margin-bottom: 50px;
	}
	.face {
		position: absolute;
		top: 0;
		left: 0;
		background-color: red;
		height: 30px;
		width: 30px;
	}
</style>
