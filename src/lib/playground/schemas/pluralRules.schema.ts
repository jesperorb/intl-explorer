
import type { PlaygroundSchema } from "$lib/playground/playground.types";

export const pluralRulesSchema: PlaygroundSchema<'PluralRules'> = {
	method: 'PluralRules',
	primaryFormatter: "select",
	inputValue: 2,
	inputValueType: "number",
	options: [
		{
			name: "type",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select",
		}
	]
};
