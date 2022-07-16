<script lang="ts">
	import Battle from '$lib/components/Battle.svelte';
	import StartScreen from '$lib/components/StartScreen.svelte';
	import Store from '$lib/components/Store.svelte';
	import { globalGameState, EGlobalStates } from '$lib/store';
</script>

{#if $globalGameState === EGlobalStates.START_SCREEN}
	<StartScreen />
{:else if $globalGameState === EGlobalStates.BATTLE}
	<Battle />
{/if}
