import type { Page } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const localeKey = 'locale';

export const localeFallback = browser
	? window.navigator.language
	: 'en-US';

export const getLocaleForSSR = (page?: Page<Record<string, string>>): string[] => {
	return page?.url.searchParams.get(localeKey)?.split(",") ?? [];
};

export const getLocaleFromParams = (page?: Page<Record<string, string>>): string[] => {
	if (!browser) {
		return getLocaleForSSR(page);
	}
	return new URLSearchParams(window.location.search).get(localeKey)?.split(",") ?? [];
};
