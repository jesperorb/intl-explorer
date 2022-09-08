import type { FormatOptionsValues } from '$lib/utils/format-utils';

export type RelativeTimeFormatOptionsKeys = keyof Intl.RelativeTimeFormatOptions;

export const relativeTimeFormatOptions = new Map<
	RelativeTimeFormatOptionsKeys,
	FormatOptionsValues
>([
	['numeric', ['always', 'auto', undefined]],
	['style', ['long', 'short', 'narrow', undefined]],
	['localeMatcher', ['best fit', 'lookup', undefined]]
]);

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
