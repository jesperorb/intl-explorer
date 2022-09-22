import { localeMatcher } from './locale-matcher';

export const collatorFormatOptions = {
	usage: ['sort', 'search', undefined],
	numeric: [true, false, undefined],
	caseFirst: ['upper', 'lower', 'false', undefined],
	sensitivity: ['base', 'accent', 'case', 'variant', undefined],
	ignorePunctuation: [true, false, undefined],
	...localeMatcher
} as const;
