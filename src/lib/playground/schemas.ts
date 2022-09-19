import type { PlaygroundSchema } from "./PlaygroundSchema.types";

export const listFormatSchema: PlaygroundSchema<'ListFormat'> = {
	method: 'ListFormat',
	options: [
		{
			name: "type",
			defaultValue: "conjunction",
			inputType: 'select',
			valueType: 'string'
		},
		{
			name: 'style',
			defaultValue: 'long',
			valueType: 'string',
			inputType: 'select'
		}
	]
};
