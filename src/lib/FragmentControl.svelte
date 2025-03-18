<script>
	let { fragments = [], contentPosition = $bindable(0.0), fragmentIndex = $bindable(0) } = $props();

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
		const progress = fragmentIndex / (fragments.length - 1);
		contentPosition = progress;
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

<svelte:window onkeydown={onKeyDown} />
