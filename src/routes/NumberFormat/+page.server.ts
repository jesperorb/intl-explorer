import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";
import type { ServerLoadEvent } from "@sveltejs/kit";
import { loadJson } from "$utils/load-json";

export async function load(loadEvent: ServerLoadEvent): Promise<BrowserSupportDataForMethod> {
	return loadJson(loadEvent);
}
