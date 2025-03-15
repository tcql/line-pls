<script>
	import Cog8Tooth from './Icons/Cog8Tooth.svelte';
	import PencilSquare from './Icons/PencilSquare.svelte';
	import PresentationChartLine from './Icons/PresentationChartLine.svelte';
	import { page } from '$app/state';

	function isActive(path) {
		return page.url.pathname == path;
	}
</script>

<div class="dock bg-neutral text-neutral-content">
	<a href="/edit" class:dock-active={isActive('/edit')}>
		<PencilSquare />
		<span class="dock-label">Edit</span>
	</a>

	<a href="/" class:dock-active={isActive('/')}>
		<PresentationChartLine />
		<span class="dock-label">Show</span>
	</a>

	<a href="/settings" class:dock-active={isActive('/settings')}>
		<Cog8Tooth />
		<span class="dock-label">Settings</span>
	</a>
</div>
