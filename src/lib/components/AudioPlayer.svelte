<script lang="ts">
	import { audioList } from '$lib/store';

	const ended = (id: number) => {
		console.log(id);
		audioList.update((old) => {
			old.splice(
				$audioList.findIndex((audio) => audio.id === id),
				1
			);
			return old;
		});
	};
</script>

{#each $audioList as audio, i}
	<audio src={audio.audio} on:ended={() => ended(audio.id)} autoplay />
{/each}
