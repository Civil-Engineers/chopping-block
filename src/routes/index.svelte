<script lang="ts">
	import Store from '$lib/components/Store.svelte';
	import { test } from '$lib/store';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>test text {$test}</p>

<Store />
