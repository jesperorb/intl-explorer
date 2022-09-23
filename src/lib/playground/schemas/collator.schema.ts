import type { PlaygroundSchema } from '$lib/playground/playground.schema';

export const collatorSchema: PlaygroundSchema<'Collator'> = {
	method: 'Collator',
	primaryFormatter: 'compare',
	inputValue: ['cat', 'hat', 'rat'],
	inputValueType: 'array',
	options: [
		{
			name: 'usage',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'caseFirst',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'sensitivity',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'caseFirst',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'numeric',
			valueType: 'boolean',
			defaultValue: undefined,
			inputType: 'radio'
		},
		{
			name: 'ignorePunctuation',
			valueType: 'boolean',
			defaultValue: undefined,
			inputType: 'radio'
		},
		{
			name: 'localeMatcher',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
	]
};
