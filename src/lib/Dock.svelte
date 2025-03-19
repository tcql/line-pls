<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import {
		Icon,
		Cog8Tooth,
		PencilSquare,
		PresentationChartLine,
		type IconSource
	} from 'svelte-hero-icons';

	function isActive(path: String): Boolean {
		return page.url.pathname == `${base}/${path}`;
	}
</script>

<div class="dock bg-neutral text-neutral-content">
	{#snippet route(title: String, path: String, icon: IconSource)}
		{@const active = isActive(path)}
		<a href="{base}/{path}" class:dock-active={active} class:text-secondary={active}>
			<Icon src={icon} size="24" />

			<span class="dock-label">{title}</span>
		</a>
	{/snippet}

	{@render route('Edit', 'edit', PencilSquare)}
	{@render route('Show', '', PresentationChartLine)}
	{@render route('Settings', 'settings', Cog8Tooth)}
</div>
