<script>
	/** @import { Component } from 'svelte' */
	import Cog8Tooth from './Icons/Cog8Tooth.svelte';
	import PencilSquare from './Icons/PencilSquare.svelte';
	import PresentationChartLine from './Icons/PresentationChartLine.svelte';
	import { page } from '$app/state';
	import { base } from '$app/paths';

	/**
	 * @typedef {object} RouteData
	 * @property {string} path
	 * @property {string} title
	 * @property {Component} icon 
	 */

	 /** @type {RouteData[]} */
	const routes = [
		{title: 'Edit', path: 'edit', icon: PencilSquare,},
		{title: 'Show', path: '', icon: PresentationChartLine},
		{title: 'Settings', path: 'settings', icon: Cog8Tooth}
	]

	function isActive(path) {
		console.log(page.url.pathname, `${base}/${path}`);
		return page.url.pathname == `${base}/${path}`;
	}
</script>

<div class="dock bg-neutral text-neutral-content">
	{#each routes as route}
		{@const active = isActive(route.path)}
		<a href="{base}/{route.path}" class:dock-active={active} class:text-secondary={active}>
			<svelte:component this={route.icon} />
			<span class="dock-label">{route.title}</span>
		</a>
	{/each}

</div>
