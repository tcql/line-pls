<script>
	import { Icon, QuestionMarkCircle, XMark } from 'svelte-hero-icons';
	import HelpContent from './HelpContent.svelte';

	let helpOpen = $state(false);
</script>

<div class="navbar bg-neutral shadow-sm">
	<div class="flex-1">
		<a class="text-primary btn btn-ghost text-xl">line, pls?</a>
	</div>
	<div class="flex-none">
		<button class="text-neutral-content btn btn-square btn-ghost" onclick={() => (helpOpen = true)}>
			<Icon src={QuestionMarkCircle} size="24" />
		</button>
	</div>
</div>

<HelpContent bind:visible={helpOpen} />
