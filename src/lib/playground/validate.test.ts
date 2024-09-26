import { test, describe, expect } from "vitest";
import { optionIsActive, validateAndUpdateSchema } from "./validate";
import { numberFormatOptionFactory, numberFormatSchemaFactory } from "$utils/factory";
import type { PlaygroundOption, PlaygroundSchema } from "./playground.schema";
import { numberFormatSchema } from "./schemas/numberFormat.schema";

describe("option is active", () => {
	test("option is active if selected", () => {
		expect(
			optionIsActive(
				numberFormatOptionFactory({
					selected: true
				})
			)
		).toBeTruthy();
	});

	test("option is active if value", () => {
		expect(
			optionIsActive(
				numberFormatOptionFactory({
					selected: undefined,
					value: 10
				})
			)
		).toBeTruthy();
	});

	test("option is active if defaulValue", () => {
		expect(
			optionIsActive(
				numberFormatOptionFactory({
					selected: undefined,
					value: undefined,
					defaultValue: 10
				})
			)
		).toBeTruthy();
	});
});

describe("option is inactive", () => {
	test("option is inactive if unselected", () => {
		expect(
			optionIsActive(
				numberFormatOptionFactory({
					selected: false
				})
			)
		).toBeFalsy();
	});

	test("option is inactive if no value", () => {
		expect(
			optionIsActive(
				numberFormatOptionFactory({
					selected: undefined,
					value: undefined,
					defaultValue: undefined
				})
			)
		).toBeFalsy();
	});
});

describe("validateAndUpdateSchema", () => {
	test("remove invalid options", () => {
		const option = numberFormatOptionFactory({
			name: "style",
			value: undefined,
			defaultValue: undefined,
			valueType: "string",
			inputType: "select"
		});
		expect(
			validateAndUpdateSchema(
				numberFormatSchemaFactory({
					options: [option],
					invalidOptionCombos: numberFormatSchema.invalidOptionCombos
				})
			)
		).toEqual(
			expect.objectContaining<Partial<PlaygroundSchema<"NumberFormat">>>({
				options: expect.not.arrayContaining<PlaygroundOption<"NumberFormat">>([option])
			})
		);
	});

	test("set unit if missing when style is unit", () => {
		const styleOption = numberFormatOptionFactory({
			name: "style",
			value: "unit",
			defaultValue: undefined,
			valueType: "string",
			inputType: "select"
		});
		const unitOption = numberFormatOptionFactory({
			name: "unit",
			value: undefined,
			defaultValue: undefined,
			valueType: "string",
			inputType: "select"
		});
		expect(
			validateAndUpdateSchema(
				numberFormatSchemaFactory({
					options: [styleOption, unitOption]
				})
			)
		).toEqual(
			expect.objectContaining<Partial<PlaygroundSchema<"NumberFormat">>>({
				options: expect.arrayContaining<PlaygroundOption<"NumberFormat">>([
					numberFormatOptionFactory({
						name: "style",
						valueType: "string",
						defaultValue: "currency",
						inputType: "select",
						value: "unit"
					}),
					numberFormatOptionFactory({
						name: "unit",
						valueType: "string",
						defaultValue: undefined,
						value: "degree",
						inputType: "select"
					})
				])
			})
		);
	});

	test("pass through option based on schema and set selected and value", () => {
		const option = numberFormatOptionFactory({
			name: "maximumFractionDigits"
		});
		expect(
			validateAndUpdateSchema(
				numberFormatSchemaFactory({
					options: [option]
				})
			)
		).toEqual(
			expect.objectContaining<Partial<PlaygroundSchema<"NumberFormat">>>({
				options: expect.arrayContaining<PlaygroundOption<"NumberFormat">>([
					numberFormatOptionFactory({
						name: "maximumFractionDigits",
						defaultValue: undefined,
						max: 20,
						min: 1,
						valueType: "number",
						inputType: "text",
						value: undefined,
						selected: undefined
					})
				])
			})
		);
	});
});
