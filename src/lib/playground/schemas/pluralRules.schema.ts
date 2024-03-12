import type { PlaygroundSchema } from '../playground.schema';

export const pluralRulesSchema: PlaygroundSchema<'PluralRules'> = {
	method: 'PluralRules',
	primaryFormatter: 'select',
	inputValues: [2, 10],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	secondaryFormatters: ['selectRange' as any],
	inputValueType: 'number',
	options: [
		{
			name: 'type',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'minimumIntegerDigits',
			valueType: 'number',
			defaultValue: undefined,
			inputType: 'text',
			max: 21,
			min: 1
		},
		{
			name: 'minimumFractionDigits',
			valueType: 'number',
			defaultValue: undefined,
			inputType: 'text',
			max: 20,
			min: 1
		},
		{
			name: 'maximumFractionDigits',
			valueType: 'number',
			defaultValue: undefined,
			inputType: 'text',
			max: 20,
			min: 1
		},
		{
			name: 'minimumSignificantDigits',
			valueType: 'number',
			defaultValue: undefined,
			inputType: 'text',
			max: 21,
			min: 1
		},
		{
			name: 'maximumSignificantDigits',
			valueType: 'number',
			defaultValue: undefined,
			inputType: 'text',
			max: 21,
			min: 1
		}, {
			name: 'roundingIncrement',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'roundingMode',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'roundingPriority',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'trailingZeroDisplay',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
	]
};
