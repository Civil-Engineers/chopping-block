<script lang="ts">
	import { playAudio, EGlobalStates, globalGameState } from '$lib/store';
</script>

<div class="con">
	<h1>Chopping Block</h1>
	<button
		on:click={() => {
			$globalGameState = EGlobalStates.INSTRUCTIONS;
			playAudio('/music/button.wav');
		}}>Start</button
	>
</div>

<style lang="scss">
	* {
		box-sizing: border-box;
	}
	.con {
		width: 100%;
		height: 100%;
		background-color: cornsilk;
		padding: 1rem;
	}
	h1 {
		margin-top: 100px;
		text-align: center;
		font-size: 200px;
		margin-bottom: 30px;
	}
	button {
		display: block;
		margin-right: auto;
		margin-left: auto;
		font-size: 100px;
		border: none;
		border-radius: 30px;
		padding: 10px 30px;
		transition: 0.5s ease;
		&:hover {
			cursor: pointer;
			transform: translateY(-20px) rotate(-5deg);
		}
	}
</style>
