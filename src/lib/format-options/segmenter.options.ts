import { localeMatcher } from './common.options';

export const segmenterOptions = {
	granularity: ['word', 'sentence', 'grapheme', undefined],
	localeMatcher
} as const;
