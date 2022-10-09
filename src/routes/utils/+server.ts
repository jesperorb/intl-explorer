import { writeCompatData } from "$lib/utils/write-compat-data";
import type { RequestEvent } from "@sveltejs/kit";

export function POST(event: RequestEvent) {
	const secret = event.url.searchParams.get("secret");
	const envSecret = process.env.SECRET;
	if(envSecret && secret && secret === process.env.SECRET) {
		writeCompatData();
		return new Response("ok");
	}
	return new Response("no no");
}
