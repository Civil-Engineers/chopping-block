<script lang="ts">
	import type { IDice } from '$lib/store';
	import RolledDice from './RolledDice.svelte';

	export let playerDice: IDice[];
</script>

<div class="dice-container">
	{#each playerDice as dice}
		{#if dice.rolled}
			<RolledDice {dice} face={dice.rolled} />
		{/if}
	{/each}
</div>

<style lang="scss">
  .dice-container {
    display: flex;
    gap: 10px;
  }
</style>
