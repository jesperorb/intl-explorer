import type { PlaygroundSchema } from '$lib/playground/playground.schema';

export const segmenterSchema: PlaygroundSchema<'Segmenter'> = {
	method: 'Segmenter',
	primaryFormatter: 'segment',
	inputValues: ['A normal sentence.'],
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
