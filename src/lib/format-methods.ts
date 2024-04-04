export const formatMethods = [
	"NumberFormat",
	"DateTimeFormat",
	"RelativeTimeFormat",
	"ListFormat",
	"PluralRules",
	"Collator",
	"Segmenter",
	"DisplayNames",
	"DurationFormat"
] as const;

export type FormatMethodsKeys =
	| "DateTimeFormat"
	| "NumberFormat"
	| "ListFormat"
	| "RelativeTimeFormat"
	| "PluralRules"
	| "Collator"
	| "Segmenter"
	| "DisplayNames"
	| "DurationFormat";
