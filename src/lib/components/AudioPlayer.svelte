<script lang="ts">
	import { audioList } from '$lib/store';

	const ended = (audioToBeRemoved: string) => {
		audioList.update((old) => {
			old.splice(
				old.findIndex((a) => a === audioToBeRemoved),
				1
			);
			return old;
		});
	};
</script>

{#each $audioList as audio}
	<audio src={audio} on:ended={() => ended(audio)} autoplay />
{/each}
