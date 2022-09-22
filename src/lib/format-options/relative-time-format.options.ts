import { localeMatcher } from './locale-matcher';

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

export const relativeTimeFormatOptions = {
	numeric: ['always', 'auto', undefined],
	style: ['long', 'short', 'narrow', undefined],
	unit: [...relativeTimeFormatUnits],
	...localeMatcher
} as const;
