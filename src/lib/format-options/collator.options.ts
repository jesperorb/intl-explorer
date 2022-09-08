import type { FormatOptionsValues } from '$lib/utils/format-utils';

export type CollatorFormatOptionsKeys = keyof Intl.CollatorOptions;

export const collatorFormatOptions = new Map<CollatorFormatOptionsKeys, FormatOptionsValues>([
	['usage', ['sort', 'search', undefined]],
	['numeric', [true, false, undefined]],
	['caseFirst', ['upper', 'lower', 'false', undefined]],
	['sensitivity', ['base', 'accent', 'case', 'variant', undefined]],
	['ignorePunctuation', [true, false, undefined]],
	['localeMatcher', ['best fit', 'lookup', undefined]]
]);
