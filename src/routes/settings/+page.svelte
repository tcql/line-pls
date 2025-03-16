<script>
	import { settings } from '$lib/stores';
	import ThemeSwitcher from '$lib/ThemeSwitcher.svelte';
</script>

<div class="prose">
	<h2>Text Settings</h2>

	<div>
		<div>
			<strong>Max characters per line</strong>
		</div>
		<input
			type="range"
			min="50"
			max="250"
			bind:value={$settings.maxLineLength}
			class="range"
			step="50"
		/>
		{$settings.maxLineLength}
	</div>
	<h2>Theme</h2>
	<ThemeSwitcher />
</div>
