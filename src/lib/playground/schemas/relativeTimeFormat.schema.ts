
import type { PlaygroundSchema } from "$lib/playground/playground.types";

export const relativeTimeFormatSchema: PlaygroundSchema<'RelativeTimeFormat'> = {
	method: 'RelativeTimeFormat',
	primaryFormatter: "format",
	inputValue: 2,
	inputValueType: "number",
	options: [
		{
			name: "unit" as keyof Intl.RelativeTimeFormatOptions,
			valueType: "string",
			defaultValue: "day" as Intl.RelativeTimeFormatNumeric,
			inputType: "select",
		},
		{
			name: "numeric",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select",
		},
		{
			name: "style",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select",
		},
		{
			name: "localeMatcher",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select",
		},
	]
};
