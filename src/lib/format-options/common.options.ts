import type { Tuple } from "$types/common";

export const style: Tuple<Intl.RelativeTimeFormatOptions["style"]> = [
	undefined,
	"long",
	"short",
	"narrow"
];
export const localeMatcher: Tuple<Intl.CollatorOptions["localeMatcher"]> = [
	undefined,
	"best fit",
	"lookup"
];
export const roundingPriority: Tuple<Intl.PluralRulesOptions["roundingPriority"]> = [
	"auto",
	"morePrecision",
	"lessPrecision",
	undefined
];
export const roundingIncrement: Tuple<Intl.PluralRulesOptions["roundingIncrement"]> = [
	1,
	2,
	5,
	10,
	20,
	25,
	50,
	100,
	200,
	250,
	500,
	1000,
	2000,
	2500,
	5000,
	undefined
];
export const roundingMode: Tuple<Intl.PluralRulesOptions["roundingMode"]> = [
	"ceil",
	"floor",
	"expand",
	"trunc",
	"halfCeil",
	"halfFloor",
	"halfExpand",
	"halfTrunc",
	"halfEven",
	undefined
];
export const trailingZeroDisplay: Tuple<Intl.PluralRulesOptions["trailingZeroDisplay"]> = [
	"auto",
	"stripIfInteger",
	undefined
];
