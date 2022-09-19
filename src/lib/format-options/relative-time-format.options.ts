import { localeMatcher } from "./locale-matcher";

export const relativeTimeFormatOptions = {
	numeric: ['always', 'auto', undefined],
	style: ['long', 'short', 'narrow', undefined],
	...localeMatcher,
} as const;

export const relativeTimeFormatUnits: Intl.RelativeTimeFormatUnit[] = [
	'year',
	'years',
	'quarter',
	'quarters',
	'month',
	'months',
	'week',
	'weeks',
	'day',
	'days',
	'hour',
	'hours',
	'minute',
	'minutes',
	'second',
	'seconds'
];
