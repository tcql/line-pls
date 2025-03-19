<script lang="ts">
	import { contentPosition } from './stores';

	let { onSetProgress } = $props();

	const percentileSize = 2;
	const percentileCount = Math.round(100 / percentileSize);

	let pos = $derived(Math.round($contentPosition * 100));

	function isInPercentile(val: number, percentile: number, size: number): boolean {
		return val >= percentile && val < percentile + size;
	}
</script>

<div class="bg-base-100 flex h-full w-4 flex-col overflow-clip rounded-lg">
	{#each { length: percentileCount }, rank}
		{@const percentile = rank * percentileSize}
		{@const inPercentile = isInPercentile(pos, percentile, percentileSize)}
		<div class="flex-1 cursor-pointer py-0.25" onclick={() => onSetProgress(percentile)}>
			<div
				class="h-full w-full rounded-sm"
				class:bg-primary={inPercentile}
				class:bg-base-300={!inPercentile}
				class:opacity-50={!inPercentile}
			></div>
		</div>
	{/each}
</div>
