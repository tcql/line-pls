<script>
	import { content } from '$lib/stores';
	import { Icon, InformationCircle } from 'svelte-hero-icons';

	let val = $content;
	let updatable = false;

	function updateContent() {
		$content = val;
		updatable = false;
	}
</script>

<div class="text-3xl">Edit</div>

<div class="flex w-full flex-1 gap-6">
	<textarea
		class="textarea h-full w-full resize-none rounded-lg"
		bind:value={val}
		onkeydown={() => (updatable = true)}
		onpaste={() => (updatable = true)}
		onchange={() => (updatable = true)}
		placeholder="Enter some text..."
	></textarea>
	<div class="border-base-200 collapse-open collapse w-128 border">
		<div class="collapse-title font-semibold">
			<Icon src={InformationCircle} size="16" class="inline" /> Tips
		</div>
		<div class="collapse-content prose text-sm">
			<p>
				Paste content in the textarea. Click "set content", and line-pls will handle cutting it in
				to lines for you and making them available on the "Show" page
			</p>
			<p>
				<strong>Plain text</strong> content is best. If copying from Project Gutenberg, it's recommended
				you copy from the "Plain Text UTF-8" version and enable "Use source line breaks" in line-pls
				settings
			</p>
		</div>
	</div>
</div>

<button class="btn btn-primary" onclick={updateContent} disabled={!updatable}>set content</button>
