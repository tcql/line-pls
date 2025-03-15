<script>
	import { content } from '$lib/stores';

	let val = $content;

	function updateContent() {
		$content = val;
	}
</script>

<div class="text-3xl">Edit</div>

<textarea
	class="textarea w-full flex-1 resize-none rounded-lg"
	bind:value={val}
	placeholder="Enter some text..."
></textarea>
<button class="btn btn-primary" on:click={updateContent}>set content</button>
