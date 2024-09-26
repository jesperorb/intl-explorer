import type { PlaygroundOption, PlaygroundSchema } from "$lib/playground/playground.schema";
import type { Factory } from "$types/common";

export const numberFormatOptionFactory: Factory<PlaygroundOption<"NumberFormat">> = (
	overrides = {}
) => ({
	name: "minimumIntegerDigits",
	valueType: "number",
	inputType: "text",
	defaultValue: undefined,
	value: undefined,
	selected: undefined,
	...overrides
});

export const dateTimeFormatOptionFactory: Factory<PlaygroundOption<"DateTimeFormat">> = (
	overrides = {}
) => ({
	name: "hour",
	valueType: "number",
	inputType: "text",
	defaultValue: undefined,
	value: undefined,
	selected: undefined,
	...overrides
});

export const numberFormatSchemaFactory: Factory<PlaygroundSchema<"NumberFormat">> = (
	overrides = {}
) => ({
	inputValues: [1091, 2000],
	...overrides,
	method: "NumberFormat",
	primaryFormatter: "format",
	inputValueType: "number",
	invalidOptionCombos: {},
	options: overrides?.options?.map(numberFormatOptionFactory) ?? [],
	secondaryFormatters: ["formatToParts", "formatRange", "formatRangeToParts"]
});

export const htmlInputElementFactory: Factory<HTMLInputElement> = (overrides = {}) => {
	return {
		...overrides
	} as HTMLInputElement;
};

export const eventFactory: Factory<Omit<Event, "target"> & { target: HTMLInputElement | null }> = (
	overrides = {}
) => {
	return {
		...overrides,
		target: overrides.target ? htmlInputElementFactory(overrides.target) : null
	} as Omit<Event, "target"> & { target: HTMLInputElement | null };
};
