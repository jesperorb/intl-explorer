import { style, localeMatcher } from "$lib/format-options/common.options";

export const listFormatOptions = {
	type: [undefined, "conjunction", "disjunction", "unit"],
	style,
	localeMatcher
} as const;
