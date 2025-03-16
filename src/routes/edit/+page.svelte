<script>
	import { content } from '$lib/stores';

	let val = $content;
	let updatable = false;

	function updateContent() {
		$content = val;
		updatable = false;
	}
</script>

<div class="text-3xl">Edit</div>

<textarea
	class="textarea w-full flex-1 resize-none rounded-lg"
	bind:value={val}
	onkeydown={() => (updatable = true)}
	onpaste={() => (updatable = true)}
	onchange={() => (updatable = true)}
	placeholder="Enter some text..."
></textarea>
<button class="btn btn-primary" onclick={updateContent} disabled={!updatable}>set content</button>
