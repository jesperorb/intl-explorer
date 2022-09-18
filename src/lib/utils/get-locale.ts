import type { Page } from "@sveltejs/kit";
import { browser } from '$app/environment';

export const localeKey = "locale";

export const localeFallback = browser ? window.navigator.language : 'en-US';

export const getLocaleForSSR = (page: Page<Record<string, string>>) => {
	const localeFromParams = page.url.searchParams.get(localeKey) ?? localeFallback;
	return browser ? localeFallback : localeFromParams;
}

export const getLocaleFromParams = () => {
	return browser ? new URLSearchParams(window.location.search).get(localeKey) : undefined;
}
