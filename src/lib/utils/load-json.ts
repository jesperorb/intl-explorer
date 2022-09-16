import type { ServerLoadEvent } from "@sveltejs/kit";

export const loadJson = async ({routeId, url}: ServerLoadEvent) => {
	try {
		const route = routeId?.includes("NumberFormat") ? "NumberFormat" : routeId;
		const response = await fetch(`${url.protocol}${url.host}/${route}-compat-data.json`);
		return response.json();
	} catch(e: unknown) {
		return null;
	}
}
