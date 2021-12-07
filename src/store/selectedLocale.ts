import { writable } from "svelte/store";

const key = "selectedLocale";

const stored = localStorage.getItem(key);

export const selectedLocale = writable(stored || window.navigator.language);

selectedLocale.subscribe((value) => localStorage.setItem(key, value));
