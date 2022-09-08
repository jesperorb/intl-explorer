import type { FormatOptionsValues } from '$lib/utils/format-utils';

export type PluralRulesOptionsKeys = keyof Intl.PluralRulesOptions;

export const pluralRulesFormatOptions = new Map<PluralRulesOptionsKeys, FormatOptionsValues>([
	['type', ['cardinal', 'ordinal', undefined]],
	['localeMatcher', ['best fit', 'lookup', undefined]]
]);
