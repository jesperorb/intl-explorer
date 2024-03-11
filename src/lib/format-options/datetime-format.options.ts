import { calendars, numberingSystems } from '$lib/locale-data/calendars';
import type { AllFormatOptionsKeys } from '$lib/format-options/types';
import { style, localeMatcher } from './common.options';

export const datetimeFormatOptions = {
	dateStyle: ['full', 'long', 'medium', 'short', undefined],
	timeStyle: ['full', 'long', 'medium', 'short', undefined],
	year: ['numeric', '2-digit', undefined],
	month: ['numeric', '2-digit', ...style],
	day: ['numeric', '2-digit', undefined],
	hour: ['numeric', '2-digit', undefined],
	minute: ['numeric', '2-digit', undefined],
	second: ['numeric', '2-digit', undefined],
	weekday: style,
	era: style,
	hour12: [true, false, undefined],
	hourCycle: ['h11', 'h12', 'h23', 'h24', undefined],
	dayPeriod: style,
	fractionalSecondDigits: [1, 2, 3, undefined],
	calendar: [...calendars, undefined],
	numberingSystem: [...numberingSystems, undefined],
	timeZoneName: ['long', 'short', undefined],
	formatMatcher: ['best fit', 'basic', undefined],
	localeMatcher
} as const;

export const getDateTimeFormatOptions = (
	option: AllFormatOptionsKeys['DateTimeFormat'] | string,
	value: string | boolean | number
): Partial<Intl.DateTimeFormatOptions> => {
	if (option === 'fractionalSecondDigits') {
		return {
			[option as AllFormatOptionsKeys['DateTimeFormat']]: value as number,
			second: 'numeric'
		};
	}
	if (option === 'hour12' || option == 'hourCycle') {
		return {
			[option as AllFormatOptionsKeys['DateTimeFormat']]: value as number,
			timeStyle: 'medium'
		};
	}
	return {
		[option]: value
	};
};
