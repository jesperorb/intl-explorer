import { browser } from "$app/environment";

export const localeKey = "locale";

export const localeFallback = browser ? window.navigator.language : "en-US";

export const getLocaleFromParams = (): string[] => {
	if (!browser) {
		return [];
	}
	return new URLSearchParams(window.location.search).get(localeKey)?.split(",") ?? [];
};
