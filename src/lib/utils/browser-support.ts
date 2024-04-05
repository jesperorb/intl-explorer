import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";

export const getSpecUrls = (data: BrowserSupportDataForMethod | null) =>
	data && Array.isArray(data.specUrl)
		? data.specUrl
		: typeof data?.specUrl === "string"
			? [data.specUrl]
			: [];
