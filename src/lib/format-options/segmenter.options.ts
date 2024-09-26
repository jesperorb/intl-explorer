import { localeMatcher } from "$lib/format-options/common.options";
import type { CreateOptions } from "$types/common";

export type SegmenterOptions = CreateOptions<Intl.SegmenterOptions>;

export const segmenterOptions: SegmenterOptions = {
	granularity: ["word", "sentence", "grapheme", undefined],
	localeMatcher
}
