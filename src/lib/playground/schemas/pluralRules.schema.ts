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
		}
	]
};
