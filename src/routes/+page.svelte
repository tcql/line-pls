<script>

	import { base } from '$app/paths';
	import { getFragments } from '$lib';
	import FragmentMinimap from '$lib/FragmentMinimap.svelte';
	import { content, contentPosition, settings } from '$lib/stores';
	import { fade } from 'svelte/transition';

	let hasContent = $content != '';

	let fragments = getFragments($content, $settings.maxLineLength, $settings.useSourceLines);
	let fragmentIndex = $state(0);
	restoreProgress();

	let currSeg = $derived(
		fragments.length > 0 
			? fragments[fragmentIndex]
			: { text: '', length: 0})
	let prevSeg = $derived(
		fragmentIndex > 0 
			? fragments[fragmentIndex - 1] 
			: { text: '', length: 0 }
	);
	let nextSeg = $derived(
		fragmentIndex !== fragments.length - 1 
			? fragments[fragmentIndex + 1] 
			: { text: '', length: 0 }
	);

	function advanceFragment() {
		if (fragmentIndex == fragments.length - 1) return;
		fragmentIndex++;
		updateProgress();
	}

	function goBackFragment() {
		if (fragmentIndex == 0) return;
		fragmentIndex--;
		updateProgress();
	}

	function updateProgress() {
		const progress = fragmentIndex / fragments.length;
		$contentPosition = progress;
	}

	function restoreProgress() {
		fragmentIndex = Math.round((fragments.length - 1) * $contentPosition);
	}

	function onKeyDown(e) {
		switch (e.keyCode) {
			case 32:
			case 39:
			case 40:
				advanceFragment();
				break;
			case 37:
			case 38:
				goBackFragment();
				break;
		}
	}
</script>

{#if !hasContent}
	<a href="{base}/edit">add some content!</a>
{:else}
	<div class="flex flex-1 flex-row gap-8">
		<div>
			<FragmentMinimap
				onSetProgress={(val) => {
					const perc = val / 100.0;
					$contentPosition = perc;
					restoreProgress();
				}}
			/>
		</div>
		<div class="flex flex-1 flex-col gap-2">
			<div class="flex flex-1 flex-col gap-8 text-5xl">
				{#key fragmentIndex}
					<div in:fade class="flex-1 text-xl opacity-60">{prevSeg.text}</div>
					<div in:fade class="flex-1">{currSeg.text}</div>
					<div in:fade class="flex-1 text-xl opacity-60">{nextSeg.text}</div>
				{/key}
			</div>
			<hr />
			<div class='flex'>
				<div class='flex-1'>Line {fragmentIndex + 1} of {fragments.length} ( {($contentPosition * 100).toFixed(1)}% )</div>
				<div>
					use <kbd class="kbd">space</kbd>, <kbd class="kbd">→</kbd>, or<kbd class="kbd">↓</kbd> to advance. 
					<kbd class="kbd">←</kbd>, or <kbd class="kbd">↑</kbd> to go back.
				</div>
			</div>
			
		
		</div>
	</div>
{/if}

<svelte:window onkeydown={onKeyDown} />
