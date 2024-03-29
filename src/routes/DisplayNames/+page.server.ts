import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';
import { loadJson } from '$lib/utils/load-json';
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function load(loadEvent: ServerLoadEvent): Promise<BrowserSupportDataForMethod> {
	return loadJson(loadEvent);
}
