<script lang="ts">
import type { IDice } from "$lib/store";

import DiceFace from "./DiceFace.svelte";

	export let dice: IDice;
	// $: scale = health / maxHealth * 100;
</script>


<div class="grid-container">
    <div/>
    <div class="grid-item">1</div>
    <div/>
    <div/>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div> 
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div/>
    <div class="grid-item">6</div>
  </div>
  

<style>
.grid-container {
    display: grid;
    grid-template-columns: auto auto auto auto;
    background-color: #2196F3;
    padding: 10px;
    width:300px;
}
.grid-item {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.8);
    
    width: 30px;
    height: 30px;
    margin: 20px;
    font-size: 30px;
    text-align: center;
}
</style>
