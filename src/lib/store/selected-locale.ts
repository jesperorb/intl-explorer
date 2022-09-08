import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const key = '@intl-explorer/selectedLocale';

const stored = browser ? localStorage.getItem(key) : undefined;
const fallback = browser ? window.navigator.language : 'en-US';

export const selectedLocale = writable(stored ?? fallback);

selectedLocale.subscribe((value) => (browser ? localStorage.setItem(key, value) : fallback));
