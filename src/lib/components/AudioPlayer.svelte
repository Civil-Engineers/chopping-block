<script lang="ts">
	import { audioList } from '$lib/store';

	const ended = (audio: string) => {
		audioList.update((old) => {
			old.splice(
				old.findIndex((a) => a === audio),
				1
			);
			return old;
		});
	};
</script>

{#each $audioList as audio}
	<audio src="audio" on:ended={() => ended(audio)} />
{/each}
