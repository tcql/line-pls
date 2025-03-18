<script>
	import { fade } from 'svelte/transition';
	let { fragmentIndex = 0, fragments = [] } = $props();

	let currSeg = $derived(fragments.length > 0 ? fragments[fragmentIndex] : { text: '', length: 0 });
	let prevSeg = $derived(
		fragmentIndex > 0 ? fragments[fragmentIndex - 1] : { text: '', length: 0 }
	);
	let nextSeg = $derived(
		fragmentIndex !== fragments.length - 1 ? fragments[fragmentIndex + 1] : { text: '', length: 0 }
	);
</script>

<div class="flex flex-1 flex-col gap-8 text-5xl">
	{#key fragmentIndex}
		<div in:fade class="flex-1 content-center text-xl opacity-60">{prevSeg.text}</div>
		<div in:fade class="flex-1 content-center">{currSeg.text}</div>
		<div in:fade class="flex-1 content-center text-xl opacity-60">{nextSeg.text}</div>
	{/key}
</div>
