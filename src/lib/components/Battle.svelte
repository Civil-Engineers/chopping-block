<script lang="ts">
	let isFastFording = false;
</script>

<div class="container">
	<button class="fast" on:click={() => (isFastFording = !isFastFording)}>
		{#if isFastFording}
			regular speed
		{:else}
			fast forward
		{/if}
	</button>
	<div class="main">
		<div class="player-slot">
			<img
				src="https://images.unsplash.com/photo-1657942147658-6611325b5042?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
				alt=""
			/>
		</div>
	</div>
</div>

<style>
	.fast {
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
	}
	.container {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.main {
		display: flex;
		width: 100%;
		height: 100%;
	}
	.player-slot {
		background: red;
		flex: 1;
	}
</style>
