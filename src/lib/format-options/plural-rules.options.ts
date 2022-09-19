import { localeMatcher } from "./locale-matcher";

export const pluralRulesFormatOptions = {
	type: ['cardinal', 'ordinal', undefined],
	...localeMatcher,
} as const;

