<script lang="ts">
	import type { IDice } from '$lib/store';
	import DiceFace from './DiceFace.svelte';

	export let dice: IDice;
	// $: scale = health / maxHealth * 100;
</script>

<div class="grid-container">
	<DiceFace face={dice.faces[0]} />
	<DiceFace face={dice.faces[1]} />
	<DiceFace face={dice.faces[2]} />
	<DiceFace face={dice.faces[3]} />
	<DiceFace face={dice.faces[4]} />
	<DiceFace face={dice.faces[5]} />
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: auto auto auto;

		padding: 1px;
		gap: 0px;
	}
</style>
