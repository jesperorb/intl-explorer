import type { PlaygroundSchema } from '$lib/playground/playground.schema';

export const listFormatSchema: PlaygroundSchema<'ListFormat'> = {
	method: 'ListFormat',
	primaryFormatter: 'format',
	secondaryFormatters: ['formatToParts'],
	inputValues: [['cat', 'hat', 'rat']],
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
