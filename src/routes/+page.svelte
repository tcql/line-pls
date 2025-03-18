<script>
	/** @import { FragmentObject } from '$lib' */
	import { base } from '$app/paths';
	import { getFragments } from '$lib';
	import FragmentControl from '$lib/FragmentControl.svelte';
	import FragmentDisplay from '$lib/FragmentDisplay.svelte';
	import FragmentMinimap from '$lib/FragmentMinimap.svelte';
	import FragmentsFooter from '$lib/FragmentsFooter.svelte';
	import { content, contentPosition, settings } from '$lib/stores';

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
</script>

{#if $content == ''}
	<a href="{base}/edit">add some content!</a>
{:else}
	<FragmentControl bind:fragmentIndex {fragments} bind:contentPosition={$contentPosition} />
	<div class="flex flex-1 flex-row gap-8">
		<FragmentMinimap
			onSetProgress={(val) => {
				const perc = val / 100.0;
				$contentPosition = perc;
				restoreProgress();
			}}
		/>

		<div class="flex flex-1 flex-col gap-2">
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
