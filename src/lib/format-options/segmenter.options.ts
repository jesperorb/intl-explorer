import { localeMatcher } from "./locale-matcher";

export const segmenterOptions = {
	granularity: ['word', 'sentence', 'grapheme', undefined],
	...localeMatcher,
} as const;
