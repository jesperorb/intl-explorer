import { style, localeMatcher } from "$lib/format-options/common.options";
import type { CreateOptions } from "$types/common";

export type ListFormatOptions = CreateOptions<Intl.ListFormatOptions>;

export const listFormatOptions: ListFormatOptions = {
	type: [undefined, "conjunction", "disjunction", "unit"],
	style,
	localeMatcher
};
