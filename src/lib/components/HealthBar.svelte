<script lang="ts">
	export let maxHealth: number;
	export let health: number;
	export let poison: number;
	export let shield: number;
	$: scale = (health / maxHealth) * 100;
</script>

<div class="container">
	<div class="health-container">
		<div class="bar" style={`width: ${scale}%`} />
		<p class="hp">{health} / {maxHealth}</p>
	</div>
	<div class=status>
		{#if poison}
			<img
				src={'/images/Poison_Status_Effect.png'}
				alt=""
			/>
			<p >{poison}</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		height: 95px;
		width: 200px;
		// margin-top: 20px;
		// border-radius: 20px;
		overflow: hidden;
	}
	.health-container {
		height: 30px;
		width: 200px;
		background-color: gray;
		position: relative;
		margin-top: 20px;
		border-radius: 20px;
		overflow: hidden;
	}
	.bar {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: #fa327d;
	}

	.hp {
		position: absolute;
		top: 0;
		left: 0;
		font-size: 30px;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: white;
	}

	.status {
		display: flex;
		position: relative;
		margin-left: 5px;
		margin-top: 3px;
		height: 48px;
		img {
			width: 40px;
			height: 40px;
			margin-bottom: 10px;
		}
		p {
			position: absolute;
			left: 40px;
			bottom: 0px;
			font-size: 20px;
			margin: 0;
			display: flex;
			align-items: end;
			justify-content: center;
			color: white;
		}
	}
	
</style>
