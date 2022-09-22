import type { Page } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const localeKey = 'locale';

export const localeFallback = browser ? window.navigator.language : 'en-US';

export const getLocaleForSSR = (page: Page<Record<string, string>>): string => {
	const localeFromParams = page.url.searchParams.get(localeKey) ?? localeFallback;
	return browser ? localeFallback : localeFromParams;
};

export const getLocaleFromParams = (): string => {
	if (!browser) return localeFallback;
	return new URLSearchParams(window.location.search).get(localeKey) ?? localeFallback;
};
