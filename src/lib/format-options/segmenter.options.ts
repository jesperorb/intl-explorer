import { localeMatcher } from "$lib/format-options/common.options";

export const segmenterOptions = {
	granularity: ["word", "sentence", "grapheme", undefined],
	localeMatcher
} as const;
