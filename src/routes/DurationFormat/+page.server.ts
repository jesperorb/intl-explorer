import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
import { loadJson } from '$lib/utils/load-json';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const ssr = false;

export async function load(loadEvent: ServerLoadEvent): Promise<BrowserCompatData> {
	return loadJson(loadEvent);
}
