import { defaultNumberRange } from "$utils/format-utils";
import { style, localeMatcher } from "$lib/format-options/common.options";
import type { CreateOptions, NumberOrUndefinedTuple } from "$types/common";

type DurationFormatOptions = CreateOptions<Intl.DurationFormatOptions>;

export const durationFormatOptions: DurationFormatOptions = {
	style: [...style, "digital"],
	years: style,
	months: style,
	weeks: style,
	days: style,
	hours: style,
	minutes: style,
	seconds: style,
	milliseconds: style,
	microseconds: style,
	nanoseconds: style,
	fractionalDigits: [...defaultNumberRange, undefined] as NumberOrUndefinedTuple,
	localeMatcher
}

export const durationValues: (keyof Intl.Duration)[] = [
	"years",
	"months",
	"weeks",
	"days",
	"hours",
	"minutes",
	"seconds",
	"milliseconds",
	"microseconds",
	"nanoseconds"
];
