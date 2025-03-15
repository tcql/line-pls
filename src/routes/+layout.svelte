<script>
	import Dock from '$lib/Dock.svelte';
	import Header from '$lib/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { themeChange } from 'theme-change';
	let { children } = $props();

	onMount(() => {
		themeChange(false);
	});
</script>

<div class="flex min-h-full flex-col">
	<Header />

	<main class="mb-16 flex flex-1 flex-col items-center py-6 sm:px-6 lg:px-8">
		<div class="flex w-full max-w-7xl flex-1 flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
			{@render children()}
		</div>
	</main>

	<Dock />
</div>
