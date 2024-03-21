import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { loadJson } from '$lib/utils/load-json';

export const prerender = false;
export const ssr = false;

export async function load(loadEvent: ServerLoadEvent): Promise<BrowserSupportDataForMethod> {
	return loadJson(loadEvent);
}
