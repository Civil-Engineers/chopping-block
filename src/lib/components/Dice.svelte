<script lang="ts">
	import type { IDice } from '$lib/store';
	import DiceFace from './DiceFace.svelte';
	export let smaller: boolean = false;
	export let dice: IDice;
</script>

<div class="grid-container">
	{#each dice.faces as face}
		<DiceFace face={face} smaller={smaller} />
	{/each}
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: auto auto auto;

		padding: 1px;
		gap: 0px;
	}
</style>
