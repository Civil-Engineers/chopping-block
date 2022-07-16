<script lang="ts">
  import { test } from '$lib/store';
</script>

<p>this is a store {$test}</p>

<button on:click={() => {$test = $test + "hello"}}>dasdfsad</button>