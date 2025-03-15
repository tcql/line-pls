<script>
	import { goto } from '$app/navigation';
	import { getSegments } from '$lib';
	import { content, contentPosition, settings } from '$lib/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let hasContent = $content != '';

	let { segments, segmentIndex } = getSegments($content, $contentPosition, $settings.maxLineLength);

	$: currSeg = segments[segmentIndex];
	$: prevSeg = segmentIndex > 0 ? segments[segmentIndex - 1] : '';
	$: nextSeg = segmentIndex !== segments.length ? segments[segmentIndex + 1] : '';

	function advanceSegment() {
		if (segmentIndex == segments.length) return;
		segmentIndex++;
	}

	function goBackSegment() {
		if (segmentIndex == 0) return;
		segmentIndex--;
	}

	function onKeyDown(e) {
		console.log(e.keyCode);
		switch (e.keyCode) {
			case 32:
			case 39:
				advanceSegment();
				break;
			case 37:
				goBackSegment();
				break;
		}
	}
</script>

{#if !hasContent}
	<a href="/edit">add some content!</a>
{:else}
	<div class="flex flex-1 flex-col gap-8 text-5xl">
		{#key segmentIndex}
			<div in:fade class="flex-1 text-xl opacity-70">{prevSeg}</div>
			<div in:fade class="flex-1">{currSeg}</div>
			<div in:fade class="flex-1 text-xl opacity-70">{nextSeg}</div>
		{/key}
	</div>
	<hr />

	Line {segmentIndex + 1} of {segments.length}
{/if}

<svelte:window on:keydown={onKeyDown} />
