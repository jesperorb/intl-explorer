import type { PlaygroundSchema } from '$lib/playground/playground.schema';

export const displayNamesSchema: PlaygroundSchema<'DisplayNames'> = {
  method: 'DisplayNames',
  primaryFormatter: 'of',
  inputValues: ['US'],
  inputValueType: 'string',
  options: [
    {
      name: 'type',
      removeUndefined: true,
      valueType: 'string',
      defaultValue: 'region',
      inputType: 'select',
    },
    {
      name: 'style',
      valueType: 'string',
      defaultValue: undefined,
      inputType: 'select',
    },
    {
      name: 'languageDisplay',
      valueType: 'string',
      defaultValue: undefined,
      inputType: 'select',
    },
    {
      name: 'fallback',
      valueType: 'string',
      defaultValue: undefined,
      inputType: 'select',
    },
    {
			name: 'localeMatcher',
			valueType: 'string',
			defaultValue: undefined,
			inputType: 'select'
		},
  ]
};
