<script lang="ts">
	import { Icon, XMark } from 'svelte-hero-icons';
	import { blur } from 'svelte/transition';
	import { base } from '$app/paths';
	import FragmentDisplay from './FragmentDisplay.svelte';
	import { onMount } from 'svelte';
	import type { FragmentObject } from '$lib';

	let { visible = $bindable(false) } = $props();

	const demoFragments: FragmentObject[] = [
		{ text: 'This is the first line', length: 1 },
		{ text: 'This is the second line', length: 1 },
		{ text: 'This is the third line', length: 1 },
		{ text: 'This is the final line!', length: 1 }
	];
	let demoFragmentIndex = $state(0);
	let demoIterDir = $state(1);

	/** convenience shortcut to quickly hide */
	function onclick() {
		visible = false;
	}

	onMount(() => {
		setInterval(() => {
			let isHittingStart = demoFragmentIndex == 0 && demoIterDir < 0;
			let isHittingEnd = demoFragmentIndex == demoFragments.length - 1 && demoIterDir > 0;
			if (isHittingStart || isHittingEnd) {
				demoIterDir *= -1;
			}
			demoFragmentIndex += demoIterDir;
		}, 2000);
	});
</script>

{#if visible}
	<div
		transition:blur={{ duration: 250 }}
		class="bg-base-100 text-base-content fixed top-0 right-0 bottom-0 left-0 z-500 h-full w-full overflow-hidden p-8"
	>
		<button class="btn btn-ghost float-right" {onclick}>
			Return <Icon src={XMark} size="24" />
		</button>
		<div class="mx-auto flex h-full flex-col">
			<div class="pb-4 text-5xl">line! line, please?</div>
			<div class="flex flex-col overflow-scroll">
				<div class="prose">
					<h3>What is this?</h3>
					<p>
						<strong>line-pls</strong> is a text content viewer that allows you to read a source text,
						emphasizing one "line" at a time. Depending on which setting you use, a "line" might be determined
						by newlines in the source text or by using a max character limit.
					</p>

					<div class="text-primary ml-8 flex h-48 items-center">
						<FragmentDisplay fragments={demoFragments} fragmentIndex={demoFragmentIndex} />
					</div>

					<p>
						The site remembers your content and where you left off, so next time you come back you
						can keep reading.
					</p>

					<h3>How do I use it?</h3>
					<p>
						Head to the <a href="{base}/edit" {onclick}>Edit</a> page, paste some content in, then
						pop over to the
						<a href="{base}/" {onclick}>Show</a> page to view the lines
					</p>
					<p>
						Use spacebar to advance to the next line, or use arrow keys to navigate forward and
						backward
					</p>
					<p>
						By default, lines are max 150 characters long, but this can be adjusted on the <a
							href="{base}/settings"
							{onclick}>Settings</a
						>
						page. If the source material is already has reasonable line lengths, you may also want to
						try out the <em>Use source line breaks</em> option.
					</p>

					<h3>About</h3>
					<p>
						Built to make careful reading of <a href="https://gutenberg.org">Project Gutenberg</a> texts
						easier. line-pls is made with:
					</p>
					<ul>
						<li><a href="https://svelte.dev/docs/kit/introduction">SvelteKit</a></li>
						<li><a href="https://tailwindcss.com">TailwindCSS</a></li>
						<li><a href="https://daisyui.com/">DaisyUI</a></li>
						<li>
							<a href="https://www.brailleinstitute.org/freefont/">Atkinson Hyperlegible Font</a> (via
							Google Fonts)
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
{/if}
