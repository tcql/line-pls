<script>
	import Cog8Tooth from './Icons/Cog8Tooth.svelte';
	import PencilSquare from './Icons/PencilSquare.svelte';
	import PresentationChartLine from './Icons/PresentationChartLine.svelte';
	import { page } from '$app/state';
	import { base } from '$app/paths';

	function isActive(path) {
		console.log(base, path);
		return page.url.pathname == `${base}/${path}`;
	}
</script>

<div class="dock bg-neutral text-neutral-content">
	<a href="{base}/edit" class:dock-active={isActive('/edit')}>
		<PencilSquare />
		<span class="dock-label">Edit</span>
	</a>

	<a href="{base}/" class:dock-active={isActive('/')}>
		<PresentationChartLine />
		<span class="dock-label">Show</span>
	</a>

	<a href="{base}/settings" class:dock-active={isActive('/settings')}>
		<Cog8Tooth />
		<span class="dock-label">Settings</span>
	</a>
</div>
