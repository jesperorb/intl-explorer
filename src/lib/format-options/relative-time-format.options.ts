import { localeMatcher, style } from './common.options';

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
	style,
	unit: relativeTimeFormatUnits,
	localeMatcher
} as const;
