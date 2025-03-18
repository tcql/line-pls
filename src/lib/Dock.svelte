<script>
	/** @import { IconSource } from 'svelte-hero-icons' */
	import { page } from '$app/state';
	import { base } from '$app/paths';

	import { Icon, Cog8Tooth, PencilSquare, PresentationChartLine } from 'svelte-hero-icons';

	/**
	 * @typedef {object} RouteData
	 * @property {string} path
	 * @property {string} title
	 * @property {IconSource} icon
	 */

	/** @type {RouteData[]} */
	const routes = [
		{ title: 'Edit', path: 'edit', icon: PencilSquare },
		{ title: 'Show', path: '', icon: PresentationChartLine },
		{ title: 'Settings', path: 'settings', icon: Cog8Tooth }
	];

	function isActive(path) {
		console.log(page.url.pathname, `${base}/${path}`);
		return page.url.pathname == `${base}/${path}`;
	}
</script>

<div class="dock bg-neutral text-neutral-content">
	{#each routes as route}
		{@const active = isActive(route.path)}
		<a href="{base}/{route.path}" class:dock-active={active} class:text-secondary={active}>
			<Icon src={route.icon} size="24" />

			<span class="dock-label">{route.title}</span>
		</a>
	{/each}
</div>
