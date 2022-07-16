<script lang="ts">
	let isFastFording = false;
</script>

<div>
	<button on:click={() => (isFastFording = !isFastFording)}>
		{#if isFastFording}
			regular speed
		{:else}
			fast forward
		{/if}
	</button>
  <div class="main">
    <div></div>
    <div></div>
  </div>
</div>

<style>
  .main {
    display: flex;
  }
  .main > div {
    background: red;
  }
</style>
