import { localeMatcher } from "$lib/format-options/common.options";
import type { CreateOptions } from "$types/common";

export type CollatorOptions = CreateOptions<Intl.CollatorOptions>

export const collatorFormatOptions: CollatorOptions = {
	usage: ["sort", "search", undefined],
	numeric: [true, false, undefined],
	caseFirst: ["upper", "lower", "false", undefined],
	sensitivity: ["base", "accent", "case", "variant", undefined],
	ignorePunctuation: [true, false, undefined],
	localeMatcher
}
