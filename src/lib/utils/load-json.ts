import type { ServerLoadEvent } from "@sveltejs/kit";

export const loadJson = async ({routeId, url}: ServerLoadEvent) => {
	try {
		const response = await fetch(`${url.protocol}${url.host}/${routeId}-compat-data.json`);
		return response.json();
	} catch(e: unknown) {
		return null;
	}
}
