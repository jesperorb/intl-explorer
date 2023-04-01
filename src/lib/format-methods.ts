export const formatMethods = [
	'DateTimeFormat',
	'NumberFormat',
	'ListFormat',
	'RelativeTimeFormat',
	'PluralRules',
	'Collator',
	'Segmenter',
	'DisplayNames'
] as const;

export type FormatMethodsKeys =
	| 'DateTimeFormat'
	| 'NumberFormat'
	| 'ListFormat'
	| 'RelativeTimeFormat'
	| 'PluralRules'
	| 'Collator'
	| 'Segmenter'
	| 'DisplayNames';
