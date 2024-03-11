import { localeMatcher } from './common.options';

export const pluralRulesFormatOptions = {
	type: ['cardinal', 'ordinal', undefined],
	localeMatcher
} as const;
