import { browser } from "$app/environment";
import { getLocaleFromParams, localeKey } from "$lib/utils/get-locale";
import { writable } from "svelte/store";

export const locales = writable(getLocaleFromParams());

locales.subscribe((value) => {
	if (browser) {
		const params = new URLSearchParams(window.location.search);
		params.set(localeKey, value.join(","));
		const formatted = value.length ? `?${params.toString()}` : "";
		window.history.replaceState(
			{},
			"",
			`${window.location.origin}${window.location.pathname}${formatted}`
		);
	}
});
