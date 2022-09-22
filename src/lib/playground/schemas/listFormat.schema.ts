import type { PlaygroundSchema } from '$lib/playground/playground.types';

export const listFormatSchema: PlaygroundSchema<'ListFormat'> = {
	method: 'ListFormat',
	primaryFormatter: 'format',
	secondaryFormatters: [
		{
			name: 'formatToParts',
			inputValues: ['cat', 'hat', 'rat'],
			inputValueType: 'array'
		}
	],
	inputValue: ['cat', 'hat', 'rat'],
	inputValueType: 'array',
	options: [
		{
			name: 'type',
			defaultValue: undefined,
			inputType: 'select',
			valueType: 'string'
		},
		{
			name: 'style',
			defaultValue: undefined,
			valueType: 'string',
			inputType: 'select'
		}
	]
};
