<script lang="ts">
	export let maxHealth: number;
	export let health: number;

	$: scale = health / maxHealth * 100;
</script>

<div class="container">
	<div class="bar" style={`width: ${scale}%`}/>
</div>

<style>
	.container {
		height: 50px;
		width: 200px;
		background-color: aquamarine;
    position: relative;
    margin-bottom: 50px;
	}
	.bar {
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('test.jpg');
    height: 100%;
    width: 100%;
	}
</style>
