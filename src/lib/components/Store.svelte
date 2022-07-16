<script lang="ts">
  import { test } from '$lib/store';

  // this is how to make props
  export let x : number = 10;

  // this is how to make props mandatory
  export let y : number;
</script>

<p>this is a store {$test}</p>

<button on:click={() => {$test = $test + "hello"}}>dasdfsad</button>