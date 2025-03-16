<script>
	import { goto } from '$app/navigation';
	import { getSegments } from '$lib';
	import SegmentMinimap from '$lib/SegmentMinimap.svelte';
	import { content, contentPosition, settings } from '$lib/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let hasContent = $content != '';

	let segments = getSegments($content, $settings.maxLineLength);
	let segmentIndex = 0;

	restoreProgress();

	$: currSeg = segments[segmentIndex];
	$: prevSeg = segmentIndex > 0 ? segments[segmentIndex - 1] : { text: '', length: 0 };
	$: nextSeg =
		segmentIndex !== segments.length ? segments[segmentIndex + 1] : { text: '', length: 0 };

	function advanceSegment() {
		if (segmentIndex == segments.length) return;
		segmentIndex++;
		updateProgress();
	}

	function goBackSegment() {
		if (segmentIndex == 0) return;
		segmentIndex--;
		updateProgress();
	}

	function updateProgress() {
		const progress = segmentIndex / segments.length;
		$contentPosition = progress;
	}

	function restoreProgress() {
		segmentIndex = Math.round(segments.length * $contentPosition);
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
	<div class="flex flex-1 flex-row gap-8">
		<div>
			<SegmentMinimap
				onSetProgress={(val) => {
					const perc = val / 100.0;
					$contentPosition = perc;
					restoreProgress();
				}}
			/>
		</div>
		<div class="flex flex-1 flex-col gap-2">
			<div class="flex flex-1 flex-col gap-8 text-5xl">
				{#key segmentIndex}
					<div in:fade class="flex-1 text-xl opacity-60">{prevSeg.text}</div>
					<div in:fade class="flex-1">{currSeg.text}</div>
					<div in:fade class="flex-1 text-xl opacity-60">{nextSeg.text}</div>
				{/key}
			</div>
			<hr />
			Line {segmentIndex + 1} of {segments.length} ( {($contentPosition * 100).toFixed(1)}% )
		</div>
	</div>
{/if}

<svelte:window on:keydown={onKeyDown} />
