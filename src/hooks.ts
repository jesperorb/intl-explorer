import type { Reroute } from "@sveltejs/kit";
import { deLocalizeUrl } from "$paraglide/runtime";

export const reroute: Reroute = (request) => {
	return deLocalizeUrl(request.url).pathname;
};
