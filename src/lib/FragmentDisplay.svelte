<script>
	import { fade } from 'svelte/transition';
	
	const emptyFragment = { text: '', length: 0 }
	let { fragmentIndex = 0, fragments = [] } = $props();

	let currFrag = $derived(fragments[fragmentIndex] || {...emptyFragment});
	let prevFrag = $derived(fragments[fragmentIndex - 1] || {...emptyFragment});
	let nextFrag = $derived(fragments[fragmentIndex + 1] || {...emptyFragment});
</script>

<div class="flex flex-1 flex-col gap-8">
	{#snippet showFragment(frag, isCurrent=false)}
		<div 
			in:fade
			class="flex-1 content-center opacity-60"
			class:text-xl={!isCurrent}
			class:opacity-60={!isCurrent}
			class:text-5xl={isCurrent}
		>{frag.text}</div>
	{/snippet}

	{#key fragmentIndex}
		{@render showFragment(prevFrag)}
		{@render showFragment(currFrag, true)}
		{@render showFragment(nextFrag)}
	{/key}
</div>
