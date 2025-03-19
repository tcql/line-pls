<script lang="ts">
	import type { FragmentObject } from '$lib';

	interface Props {
		fragments: FragmentObject[];
		fragmentIndex: number;
	}
	let { fragments = [], fragmentIndex = $bindable(0) }: Props = $props();

	function advanceFragment() {
		if (fragmentIndex == fragments.length - 1) return;
		fragmentIndex++;
	}

	function goBackFragment() {
		if (fragmentIndex == 0) return;
		fragmentIndex--;
	}

	function onKeyDown({ code }: KeyboardEvent) {
		switch (code) {
			case 'ArrowDown':
			case 'ArrowRight':
			case 'Space':
				advanceFragment();
				break;
			case 'ArrowUp':
			case 'ArrowLeft':
				goBackFragment();
				break;
		}
	}
</script>

<svelte:window onkeydown={onKeyDown} />
