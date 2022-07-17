<script lang="ts">
	export let maxHealth: number;
	export let health: number;

	$: scale = (health / maxHealth) * 100;
</script>

<div class="container">
	<div class="bar" style={`width: ${scale}%`} />
	<p>{health} / {maxHealth}</p>
</div>

<style>
	.container {
		height: 50px;
		width: 200px;
		background-color: gray;
		position: relative;
		margin-bottom: 50px;
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
	p {
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
</style>
