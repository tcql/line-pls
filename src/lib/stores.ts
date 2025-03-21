import { persisted } from 'svelte-persisted-store';
import { writable } from 'svelte/store';

// First param `preferences` is the local storage key.
// Second param is the initial value.
export const content = persisted('content', '');

// what percentage of the way through content (based on index in fragments list post-split) we are
export const contentPosition = persisted('content-position', 0);

let prev: string | null;
content.subscribe((val: string) => {
	// This handling allows us to only reset content position
	// *after* the initial load from localstorage, and only if
	// the new val isn't the old val
	if (prev && prev != val) {
		contentPosition.set(0);
	}
	prev = val;
});

export const settings = persisted('settings', {
	maxLineLength: 150,
	useSourceLines: false
});

export const helpOpen = writable(false);
