import type { PlaygroundSchema } from '$lib/playground/playground.schema';

const invalidOptions = ["day", "hour", "minute", "second", "weekday", "era", "dayPeriod"];

export const dateTimeFormatSchema: PlaygroundSchema<'DateTimeFormat'> = {
	method: 'DateTimeFormat',
	primaryFormatter: 'format',
	inputValue: '2004-04-04T04:04:04',
	inputValueType: 'date',
	invalidOptionCombos: {
		"dateStyle:long": invalidOptions,
		"dateStyle:full": invalidOptions,
		"dateStyle:medium": invalidOptions,
		"dateStyle:short": invalidOptions,
		"timeStyle:long": invalidOptions,
		"timeStyle:full": invalidOptions,
		"timeStyle:medium": invalidOptions,
		"timeStyle:short": invalidOptions,
	},
	options: [
		{
			name: 'dateStyle',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'timeStyle',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'day',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'hour',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'minute',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'second',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'weekday',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'era',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'dayPeriod',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'hourCycle',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'hour12',
			valueType: 'boolean',
			defaultValue: undefined,
			inputType: 'radio'
		},
		{
			name: 'calendar',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'fractionalSecondDigits',
			valueType: 'number',
			defaultValue: undefined,
			inputType: 'text'
		},
		{
			name: 'numberingSystem',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'timeZoneName',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'localeMatcher',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'formatMatcher',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		}
	]
};
