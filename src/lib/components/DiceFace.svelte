<script lang="ts">
	import type { IFace } from '$lib/store';
	import DiceFace from './DiceFace.svelte';

	export let face: IFace;
	// $: scale = health / maxHealth * 100;
</script>

<div class="face" style={`background-color: ${face.ability.icon}`}>
    {face.ability.value}
</div>

<style>
	.container {
		height: 50px;
		width: 200px;
		background-color: blue;
		position: relative;
		margin-bottom: 50px;
	}
	.face {
		background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(0, 0, 0, 0.8);
        
        width: 30px;
        height: 30px;
        font-size: 22px;
        color: black;
        text-align: center;
        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
	}
</style>
