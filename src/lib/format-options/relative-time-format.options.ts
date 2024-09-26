import { localeMatcher, style } from "$lib/format-options/common.options";
import type { CreateOptions } from "$types/common";

export type RelativeTimeFormatOptions = CreateOptions<Intl.RelativeTimeFormatOptions> & {
	unit: Intl.RelativeTimeFormatUnit[];
}

export const relativeTimeFormatUnits: Intl.RelativeTimeFormatUnit[] = [
	"year",
	"years",
	"quarter",
	"quarters",
	"month",
	"months",
	"week",
	"weeks",
	"day",
	"days",
	"hour",
	"hours",
	"minute",
	"minutes",
	"second",
	"seconds"
];

export const relativeTimeFormatOptions: RelativeTimeFormatOptions = {
	numeric: ["always", "auto", undefined],
	style,
	unit: relativeTimeFormatUnits,
	localeMatcher
}
