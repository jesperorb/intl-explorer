import {
	numberFormatOptionsCurrency,
	numberFormatOptionsUnit
} from '$lib/format-options/number-format.options';
import { units } from '$lib/locale-data/units';
import type { PlaygroundSchema } from '$lib/playground/playground.types';

export const numberFormatSchema: PlaygroundSchema<'NumberFormat'> = {
	method: 'NumberFormat',
	primaryFormatter: 'format',
	inputValue: 1091,
	inputValueType: 'number',
	invalidOptionCombos: {
		'style:currency': Object.keys(numberFormatOptionsUnit),
		'style:unit': Object.keys(numberFormatOptionsCurrency)
	},
	options: [
		{
			name: 'style',
			valueType: 'string',
			defaultValue: 'currency',
			inputType: 'select',
			removeUndefined: true
		},
		/** UNIT */
		{
			name: 'unit',
			valueType: 'string',
			defaultValue: units['20'],
			inputType: 'select'
		},
		{
			name: 'compactDisplay',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'unitDisplay',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'notation',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		/** CURRENCY */
		{
			name: 'currency',
			valueType: 'string',
			defaultValue: 'SEK',
			inputType: 'select'
		},
		{
			name: 'currencySign',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'currencyDisplay',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		/** COMMON */
		{
			name: 'signDisplay',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'useGrouping',
			valueType: 'boolean',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'minimumIntegerDigits',
			valueType: 'number',
			defaultValue: undefined,
			inputType: 'text'
		},
		{
			name: 'minimumFractionDigits',
			valueType: 'number',
			defaultValue: undefined,
			inputType: 'text'
		},
		{
			name: 'maximumFractionDigits',
			valueType: 'number',
			defaultValue: undefined,
			inputType: 'text'
		},
		{
			name: 'minimumSignificantDigits',
			valueType: 'number',
			defaultValue: undefined,
			inputType: 'text'
		},
		{
			name: 'maximumSignificantDigits',
			valueType: 'number',
			defaultValue: undefined,
			inputType: 'text'
		},
		{
			name: 'localeMatcher',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		}
	]
};
