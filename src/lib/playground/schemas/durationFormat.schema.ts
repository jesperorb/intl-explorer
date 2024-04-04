import { durationValues } from "$lib/format-options/duration-format.options";
import type { PlaygroundOption, PlaygroundSchema } from "$lib/playground/playground.schema";

export const durationFormatSchema: PlaygroundSchema<"DurationFormat"> = {
	method: "DurationFormat",
	primaryFormatter: "format",
	secondaryFormatters: ["formatToParts"],
	inputValues: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
	inputValueType: "array",
	options: [
		{
			name: "style",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select"
		},
		...(durationValues.map((duration) => ({
			name: duration,
			valueType: "string",
			defaultValue: undefined,
			inputType: "select"
		})) as PlaygroundOption<"DurationFormat">[]),
		{
			name: "fractionalDigits",
			valueType: "number",
			defaultValue: undefined,
			inputType: "text",
			max: 3,
			min: 0
		}
	]
};
