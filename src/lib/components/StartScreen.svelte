<script lang="ts">
	import { globalGameState, EGlobalStates } from '$lib/store';
</script>

<h1>start screen</h1>
<button on:click={() => ($globalGameState = EGlobalStates.BATTLE)}>play</button>
