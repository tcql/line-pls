<script>
	let { fragmentIndex = 0, fragmentCount = 0, contentPosition = 0 } = $props();

	let pct = $derived((contentPosition * 100).toFixed(1));
</script>

<div class="flex">
	<div class="flex-1">
		Line {fragmentIndex + 1} of {fragmentCount} ( {pct}% )
	</div>
	<div>
		use <kbd class="kbd">space</kbd>, <kbd class="kbd">→</kbd>, or<kbd class="kbd">↓</kbd> to
		advance.
		<kbd class="kbd">←</kbd>, or <kbd class="kbd">↑</kbd> to go back.
	</div>
</div>
