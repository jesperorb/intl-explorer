import { style, localeMatcher } from "$lib/format-options/common.options";

export const displayNamesOptions = {
	style,
	type: ["language", "region", "script", "calendar", "dateTimeField", "currency", undefined],
	languageDisplay: ["dialect", "standard", undefined],
	fallback: ["code", "none", undefined],
	localeMatcher
} as const;
