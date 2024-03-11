import { style, localeMatcher } from './common.options';

export const listFormatOptions = {
	type: [undefined, 'conjunction', 'disjunction', 'unit'],
	style,
	localeMatcher
} as const;
