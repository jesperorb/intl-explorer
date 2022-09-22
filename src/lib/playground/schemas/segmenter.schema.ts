import type { PlaygroundSchema } from '$lib/playground/playground.types';

export const segmenterSchema: PlaygroundSchema<'Segmenter'> = {
	method: 'Segmenter',
	primaryFormatter: 'segment',
	inputValue: 'A normal sentence.',
	inputValueType: 'string',
	options: [
		{
			name: 'granularity',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
		{
			name: 'localeMatcher',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		}
	]
};
