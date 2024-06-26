import {
	numberFormatOptionsCurrency,
	numberFormatOptionsUnit
} from "$lib/format-options/number-format.options";
import type { PlaygroundSchema } from "$lib/playground/playground.schema";

export const numberFormatSchema: PlaygroundSchema<"NumberFormat"> = {
	method: "NumberFormat",
	primaryFormatter: "format",
	inputValues: [1091, 2000],
	inputValueType: "number",
	secondaryFormatters: ["formatToParts", "formatRange", "formatRangeToParts"],
	invalidOptionCombos: {
		"style:currency": Object.keys(numberFormatOptionsUnit),
		"style:unit": Object.keys(numberFormatOptionsCurrency),
		"style:undefined": [
			...Object.keys(numberFormatOptionsCurrency),
			...Object.keys(numberFormatOptionsUnit)
		]
	},
	options: [
		{
			name: "style",
			valueType: "string",
			defaultValue: "currency",
			inputType: "select"
		},
		/** UNIT */
		{
			name: "unit",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select"
		},
		{
			name: "compactDisplay",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select"
		},
		{
			name: "unitDisplay",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select"
		},
		{
			name: "notation",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select"
		},
		/** CURRENCY */
		{
			name: "currency",
			valueType: "string",
			defaultValue: "USD",
			inputType: "select"
		},
		{
			name: "currencySign",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select"
		},
		{
			name: "currencyDisplay",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select"
		},
		/** COMMON */
		{
			name: "signDisplay",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select"
		},
		{
			name: "useGrouping",
			valueType: "boolean",
			defaultValue: undefined,
			inputType: "radio"
		},
		{
			name: "minimumIntegerDigits",
			valueType: "number",
			defaultValue: undefined,
			inputType: "text",
			max: 21,
			min: 1
		},
		{
			name: "minimumFractionDigits",
			valueType: "number",
			defaultValue: undefined,
			inputType: "text",
			max: 20,
			min: 1
		},
		{
			name: "maximumFractionDigits",
			valueType: "number",
			defaultValue: undefined,
			inputType: "text",
			max: 20,
			min: 1
		},
		{
			name: "minimumSignificantDigits",
			valueType: "number",
			defaultValue: undefined,
			inputType: "text",
			max: 21,
			min: 1
		},
		{
			name: "maximumSignificantDigits",
			valueType: "number",
			defaultValue: undefined,
			inputType: "text",
			max: 21,
			min: 1
		},
		{
			name: "roundingIncrement",
			valueType: "number",
			defaultValue: undefined,
			inputType: "select"
		},
		{
			name: "roundingMode",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select"
		},
		{
			name: "roundingPriority",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select"
		},
		{
			name: "trailingZeroDisplay",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select"
		},
		{
			name: "localeMatcher",
			valueType: "string",
			defaultValue: undefined,
			inputType: "select"
		}
	]
};
