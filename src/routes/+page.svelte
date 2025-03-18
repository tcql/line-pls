<script>
	/** @import { FragmentObject } from '$lib' */
	import { base } from '$app/paths';
	import { getFragments } from '$lib';
	import FragmentControl from '$lib/FragmentControl.svelte';
	import FragmentDisplay from '$lib/FragmentDisplay.svelte';
	import FragmentMinimap from '$lib/FragmentMinimap.svelte';
	import FragmentsFooter from '$lib/FragmentsFooter.svelte';
	import FragmentSearch from '$lib/FragmentSearch.svelte';
	import { content, contentPosition, settings, helpOpen } from '$lib/stores';

	/**
	 * List of fragments or "lines" that will be displayed one by one
	 * @type {FragmentObject[]}
	 */
	let fragments = getFragments($content, $settings.maxLineLength, $settings.useSourceLines);

	/**
	 * The index in the fragment list of which line we're currently viewing/focusing on
	 * @type {number}
	 */
	let fragmentIndex = $state(0);

	restoreProgress();

	function restoreProgress() {
		fragmentIndex = Math.round((fragments.length - 1) * $contentPosition);
	}

	/**
	 * @param {number} percentage human-friendly percentage (eg: 58%) to set content progress to
	 */
	function setProgressTo(percentage) {
		$contentPosition = percentage / 100.0
		restoreProgress();
	}
</script>

{#if $content == ''}
<div class='prose'>
	<h3>Welcome to <strong class='text-secondary'>line-pls</strong>!</h3>
	<p>
		Check out the <a class='cursor-pointer' onclick={()=> $helpOpen = true}>Help</a> for guidance,
		or go ahead and <a class='cursor-pointer' href="{base}/edit">add some content</a>
	</p>
	<p>
		Happy reading!
	</p>
</div>
{:else}
	<FragmentControl bind:fragmentIndex {fragments} bind:contentPosition={$contentPosition} />
	<div class="flex flex-1 flex-row gap-8">
		<FragmentMinimap
			onSetProgress={setProgressTo}
		/>

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
