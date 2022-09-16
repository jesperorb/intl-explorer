import { loadJson } from '$lib/utils/load-json';
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function load(loadEvent: ServerLoadEvent) {
	return loadJson(loadEvent);
}
