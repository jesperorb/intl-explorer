import { describe, expect, test } from "vitest";
import {
	getItemsFromOption,
	prepareInputValues,
	prepareSchemaForOutput,
	schemaToCode,
	schemaToFormatOptions,
	schemaToPrimaryFormatterOutput,
	updateOptionOnSchema
} from "./format.utils";
import {
	dateTimeFormatOptionFactory,
	eventFactory,
	numberFormatOptionFactory,
	numberFormatSchemaFactory
} from "$utils/factory";
import { dateTimeFormatSchema } from "./schemas/dateTimeFormat.schema";
import type { PlaygroundOption, PlaygroundSchema } from "./playground.schema";
import { durationFormatSchema } from "./schemas/durationFormat.schema";

describe("updateOptionOnSchema", () => {
	test("update text field option", () => {
		expect(
			updateOptionOnSchema(
				{ ...dateTimeFormatSchema },
				eventFactory({
					target: {
						name: "hour",
						value: "8"
					}
				})
			)
		).toEqual(
			expect.objectContaining<Partial<PlaygroundSchema<"DateTimeFormat">>>({
				options: expect.arrayContaining<PlaygroundOption<"DateTimeFormat">>([
					dateTimeFormatOptionFactory({
						inputType: "select",
						name: "hour",
						value: "8",
						valueType: "string",
						defaultValue: undefined,
						selected: undefined
					})
				])
			})
		);
	});

	test("update checkbox field option", () => {
		expect(
			updateOptionOnSchema(
				{ ...dateTimeFormatSchema },
				eventFactory({
					target: {
						name: "hour12",
						checked: true,
						type: "checkbox"
					}
				})
			)
		).toEqual(
			expect.objectContaining<Partial<PlaygroundSchema<"DateTimeFormat">>>({
				options: expect.arrayContaining<PlaygroundOption<"DateTimeFormat">>([
					dateTimeFormatOptionFactory({
						inputType: "radio",
						name: "hour12",
						valueType: "boolean",
						defaultValue: undefined,
						selected: true
					})
				])
			})
		);
	});

	test("update radio field option", () => {
		expect(
			updateOptionOnSchema(
				{ ...dateTimeFormatSchema },
				eventFactory({
					target: {
						name: "hour12",
						value: "true",
						type: "radio"
					}
				})
			)
		).toEqual(
			expect.objectContaining<Partial<PlaygroundSchema<"DateTimeFormat">>>({
				options: expect.arrayContaining<PlaygroundOption<"DateTimeFormat">>([
					dateTimeFormatOptionFactory({
						inputType: "radio",
						name: "hour12",
						value: true,
						valueType: "boolean",
						defaultValue: undefined,
						selected: undefined
					})
				])
			})
		);
	});
	test("clamp field with min/max options", () => {
		expect(
			updateOptionOnSchema(
				{ ...dateTimeFormatSchema },
				eventFactory({
					target: {
						name: "fractionalSecondDigits",
						value: "6"
					}
				})
			)
		).toEqual(
			expect.objectContaining<Partial<PlaygroundSchema<"DateTimeFormat">>>({
				options: expect.arrayContaining<PlaygroundOption<"DateTimeFormat">>([
					dateTimeFormatOptionFactory({
						inputType: "text",
						name: "fractionalSecondDigits",
						min: 0,
						max: 3,
						value: 3,
						valueType: "number",
						defaultValue: undefined,
						selected: undefined
					})
				])
			})
		);
	});
});

describe("schemaToFormatOptions", () => {
	test("keep options with values", () => {
		expect(
			schemaToFormatOptions(
				numberFormatSchemaFactory({
					options: [
						{
							name: "roundingIncrement",
							inputType: "text",
							value: "12"
						}
					]
				})
			)
		).toEqual({
			roundingIncrement: "12"
		});
	});
	test("remove empty values", () => {
		expect(
			schemaToFormatOptions(
				numberFormatSchemaFactory({
					options: [
						{
							name: "roundingIncrement",
							inputType: "text",
							value: ""
						}
					]
				})
			)
		).toEqual({});
	});
	test("remove inactive values", () => {
		expect(
			schemaToFormatOptions(
				numberFormatSchemaFactory({
					options: [
						{
							name: "roundingIncrement",
							inputType: "text",
							value: "12",
							selected: false
						}
					]
				})
			)
		).toEqual({});
	});
});

describe("getItemsFromOption", () => {
	test("get items", () => {
		expect(
			getItemsFromOption(
				"NumberFormat",
				numberFormatOptionFactory({
					name: "style"
				})
			)
		).toEqual([
			["currency", "currency"],
			["unit", "unit"]
		]);
	});
});

describe("prepareSchemaForOutput", () => {
	test("get options when any", () => {
		expect(
			prepareSchemaForOutput(
				numberFormatSchemaFactory({
					options: [
						{
							name: "roundingIncrement",
							inputType: "text",
							value: "12"
						}
					]
				})
			)
		).toEqual({
			options: {
				roundingIncrement: "12"
			},
			hasOptions: true
		});
	});

	test("do not get options when empty", () => {
		expect(
			prepareSchemaForOutput(
				numberFormatSchemaFactory({
					options: [
						{
							name: "roundingIncrement",
							inputType: "text",
							value: undefined
						}
					]
				})
			)
		).toEqual({
			options: {},
			hasOptions: false
		});
	});
});

describe("prepareInputValues", () => {
	test("format date input values", () => {
		const [date1, date2] = prepareInputValues({ ...dateTimeFormatSchema });
		expect(date1).toBeInstanceOf(Date);
		expect(date2).toBeInstanceOf(Date);
	});

	test("format duration format input values", () => {
		const [value] = prepareInputValues({ ...durationFormatSchema });
		expect(value).toEqual({
			years: 1,
			months: 2,
			weeks: 3,
			days: 4,
			hours: 5,
			minutes: 6,
			seconds: 7,
			milliseconds: 8,
			microseconds: 9,
			nanoseconds: 10
		});
	});

	test("format regular values", () => {
		const [value] = prepareInputValues(numberFormatSchemaFactory());
		expect(value).toEqual(1091);
	});
});

describe("schemaToPrimaryFormatterOutput", () => {
	test("format default", () => {
		expect(schemaToPrimaryFormatterOutput(numberFormatSchemaFactory(), [])).toEqual("1,091");
	});
});

describe("schemaToCode", () => {
	test("format default", () => {
		expect(schemaToCode(numberFormatSchemaFactory(), [])).toEqual("new Intl.NumberFormat(undefined).format(1091)\n");
	})
})
