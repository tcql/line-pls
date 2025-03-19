<script lang="ts">
	/** @import { FragmentObject } from '$lib' */
	import { base } from '$app/paths';
	import { getFragments, type FragmentObject } from '$lib';
	import FragmentControl from '$lib/FragmentControl.svelte';
	import FragmentDisplay from '$lib/FragmentDisplay.svelte';
	import FragmentMinimap from '$lib/FragmentMinimap.svelte';
	import FragmentsFooter from '$lib/FragmentsFooter.svelte';
	import FragmentSearch from '$lib/FragmentSearch.svelte';
	import { content, contentPosition, settings, helpOpen } from '$lib/stores';

	/**
	 * List of fragments or "lines" that will be displayed one by one
	 */
	let fragments: FragmentObject[] = getFragments(
		$content,
		$settings.maxLineLength,
		$settings.useSourceLines
	);

	/**
	 * The index in the fragment list of which line we're currently viewing/focusing on
	 */
	let fragmentIndex: number = $state(0);

	/**
	 * Set contentPosition store when the fragmentIndex state gets updated.
	 * This usually occurs when the user presses one of the control keys
	 * or uses the search feature
	 */
	$effect(() => {
		$contentPosition = fragmentIndex / (fragments.length - 1);
	});

	restoreProgress();

	/**
	 * calculates a fragment index based on the fractional percent contentPosition.
	 * this occurs when we first load the page (restoring progress from localStorage)
	 * or when the Minimap updates location (via setProgressTo)
	 */
	function restoreProgress(): void {
		fragmentIndex = Math.round((fragments.length - 1) * $contentPosition);
	}

	/**
	 * uses human-friendly percentage (eg: 58%) to set contentPosition
	 */
	function setProgressTo(percentage: number): void {
		$contentPosition = percentage / 100.0;
		restoreProgress();
	}
</script>

{#if $content == ''}
	<div class="prose">
		<h3>Welcome to <strong class="text-secondary">line-pls</strong>!</h3>
		<p>
			Check out the <a class="cursor-pointer" onclick={() => ($helpOpen = true)}>Help</a>
			for guidance, or go ahead and
			<a class="cursor-pointer" href="{base}/edit">add some content</a>
		</p>
		<p>Happy reading!</p>
	</div>
{:else}
	<FragmentControl bind:fragmentIndex {fragments} />
	<div class="flex flex-1 flex-row gap-8">
		<FragmentMinimap onSetProgress={setProgressTo} />

		<div class="flex flex-1 flex-col gap-2">
			<FragmentSearch {fragments} bind:fragmentIndex />
			<FragmentDisplay {fragments} {fragmentIndex} />
			<hr />
			<FragmentsFooter
				fragmentCount={fragments.length}
				{fragmentIndex}
				contentPosition={$contentPosition}
			/>
		</div>
	</div>
{/if}
