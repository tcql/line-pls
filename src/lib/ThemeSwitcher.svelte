<script>
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	const themes = [
		'dracula',
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter',
		'dim',
		'nord',
		'sunset',
		'caramellatte',
		'abyss',
		'silk'
	];

	onMount(() => {
		themeChange(false);
	});
</script>

<select class="select cursor-pointer" data-choose-theme>
	{#each themes as theme}
		<option value={theme}>{theme}</option>
	{/each}
</select>
