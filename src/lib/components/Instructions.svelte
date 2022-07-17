<script lang="ts">
	import { playAudio, EGlobalStates, globalGameState } from '$lib/store';
</script>

<div class="con">
	<h1 class="titl">Instructions</h1>
	<p class="inst">How to play! <br><br>
		You have two 6 sided dice with each face representing an ability. <br><br>
		These abilities are randomized during the fight and used against the enemy!<br><br> 
		These are the abilities:<br>
		Fist --> Deals damage<br>
		Shield -->Block incoming damage<br>
		2x --> Multiplies Damage <br>
		Heart --> Restores HP<br>
		Gold --> Get money <br>
		Axe --> Deals Damage to ALL enemies*<br><br>
		
		These abilities can be switched out and bought in the shop after a successful win in a battle.
		<br><br>
		Fight all the enemies to get to the boss!</p>
	<button
		on:click={() => {
			$globalGameState = EGlobalStates.BATTLE;
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
		margin-top: 20px;
		text-align: center;
		font-size: 80px;
		margin-bottom: 30px;
	}
	p {
		text-align: center;
		font-size: 15px;
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
