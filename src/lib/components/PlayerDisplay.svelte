<script lang="ts">
	import type { IPlayer } from '$lib/store';
	import type { Writable } from 'svelte/store';

	import HealthBar from './HealthBar.svelte';

	export let player: Writable<IPlayer>;
</script>

<div class="player-slot">
	<div class="player">
		<HealthBar maxHealth={$player.maxHealth} health={$player.health} />
		<img src="test.jpg" alt="" />
	</div>
</div>

<style lang="scss">
	.player-slot {
		background: red;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		padding-bottom: 40px;
	}
	.player {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		> img {
			object-fit: cover;
			width: 100px;
			height: 100px;
			display: block;
		}
	}
</style>
