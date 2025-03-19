<script lang="ts">
	import { settings } from '$lib/stores';
	import ThemeSwitcher from '$lib/ThemeSwitcher.svelte';
</script>

<div class="prose">
	<h2>Text Settings</h2>
	<div class="flex flex-col gap-4">
		<div>
			<strong>Use source line breaks</strong>
			<input type="checkbox" bind:checked={$settings.useSourceLines} class="checkbox" />
			<p>
				If this is set, fragments will be determined by the line breaks in the source material. This
				may result in fragments that are too long and cause scrolling, depending on the source.
			</p>
		</div>

		<div class:opacity-20={$settings.useSourceLines}>
			<div>
				<strong>Max characters per line</strong>
			</div>
			<input
				type="range"
				min="50"
				max="250"
				bind:value={$settings.maxLineLength}
				disabled={$settings.useSourceLines}
				class="range"
				step="50"
			/>
			{$settings.maxLineLength}
		</div>
	</div>
	<h2>Theme</h2>
	<ThemeSwitcher />
</div>
