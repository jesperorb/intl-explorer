import { localeMatcher } from './locale-matcher';

export const listFormatOptions = {
	type: [undefined, 'conjunction', 'disjunction', 'unit'],
	style: [undefined, 'long', 'short', 'narrow'],
	...localeMatcher
} as const;
