<script lang="ts">
	import { findInFragments, type FragmentObject } from '$lib';
	import { ChevronLeft, ChevronRight, Icon, type IconSource } from 'svelte-hero-icons';

	interface Props {
		fragmentIndex: number;
		fragments: FragmentObject[];
	}
	let { fragmentIndex = $bindable(0), fragments = [] }: Props = $props();

	let searchValue = $state('');
	let prevResult = $derived(runSearch(searchValue, fragmentIndex - 1, true));
	let nextResult = $derived(runSearch(searchValue, fragmentIndex + 1));

	function runSearch(search: string, start: number, reverse = false): number {
		if (search.length < 3) {
			return -1;
		}
		return findInFragments(fragments, search, start, reverse);
	}

	/**
	 * update fragmentIndex to the provided search result, if it's valid
	 */
	function gotoResult(idx: number) {
		if (idx !== -1) {
			fragmentIndex = Number(idx);
		}
	}
</script>

{#snippet searchNav(idx: number, icon: IconSource)}
	{@const disabled = idx === -1}
	{@const onclick = () => gotoResult(idx)}

	<button class="btn btn-sm join-item" {disabled} {onclick}>
		<Icon src={icon} size="12" />
	</button>
{/snippet}

<div class="flex flex-row-reverse items-center gap-4">
	<div class="join">
		<div>
			<label class="input input-sm join-item">
				<input type="search" placeholder="Search" bind:value={searchValue} />
			</label>
		</div>
		{@render searchNav(prevResult, ChevronLeft)}
		{@render searchNav(nextResult, ChevronRight)}
	</div>
</div>
