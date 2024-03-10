import { browser } from '$app/environment';
import { trackEvent } from '$lib/utils/analytics';
import { getLocaleFromParams, localeFallback, localeKey } from '$lib/utils/get-locale';
import { writable } from 'svelte/store';

export const selectedLocale = writable(getLocaleFromParams() ?? localeFallback);

selectedLocale.subscribe((value) => {
	if (browser) {
		const params = new URLSearchParams(window.location.search);
		params.set(localeKey, value);
		trackEvent("Change Locale", {
			locale: value,
		})
		window.history.replaceState(
			{},
			'',
			`${window.location.origin}${window.location.pathname}?${params.toString()}`
		);
	}
});
