/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FormatMethodsKeys } from "$lib/format-methods";
import type { AllFormatOptions } from "$lib/format-options/types";
import type { PlaygroundOption, PlaygroundSchema } from "./playground.schema";

import { formatOptions } from "$lib/format-options";

export const schemaToFormatOptions = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>
) => {
	const formatOptions: Partial<AllFormatOptions[Method]> = {};
	for (const option of schema.options) {
		const value = option.value ?? option.defaultValue;
		formatOptions[option.name] = value === "" ? undefined : value;
	}
	return formatOptions as AllFormatOptions[Method];
}

export const getItemsFromOption = <Method extends FormatMethodsKeys>(
	method: Method,
	option: PlaygroundOption<Method>
) => {
	const optionsForMethod = formatOptions[method];
	const name = option.name as keyof typeof optionsForMethod;
	const options = optionsForMethod[name] as Array<PlaygroundOption<Method>>;
	return options?.map((option: PlaygroundOption<Method>) => [option, option]) ?? [];
};

export const schemaToPrimaryFormatterOutput = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>,
	locale: string,
) => {
	const options = schemaToFormatOptions(schema);
	const isRelativeTime = schema.method === "RelativeTimeFormat";
	let secondaryInput = undefined;
	// TODO: Yikes
	if (isRelativeTime) {
		//@ts-ignore
		secondaryInput = options["unit"];
		//@ts-ignore
		delete options["unit"];
	}
	const input = schema.inputValueType === "date"
		? new Date(schema.inputValue)
		: schema.inputValue;
	// TODO: Yikes
	if (schema.method === "Collator") {
		// @ts-ignore
		const formattedString = (schema.inputValue as unknown[]).sort(new Intl[schema.method](
			locale,
			options as Record<string, string>
		)[schema.primaryFormatter])
		return `${formattedString}`
	}
	// @ts-ignore
	const formatted = new Intl[schema.method](
		locale,
		options as Record<string, string>
	)[schema.primaryFormatter](input, secondaryInput)
	if(schema.method === "Segmenter") {
		return `${JSON.stringify(Array.from(formatted), null, 2)}`
	}
	return `${formatted}`
}

export const schemaToCode = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>,
	locale: string
) => {
	const input = JSON.stringify(schema.inputValue);
	const formatter = String(schema.primaryFormatter);
	const isRelativeTime = schema.method === "RelativeTimeFormat";
	const options = schemaToFormatOptions(schema);
	let secondaryInput = undefined;
	if (isRelativeTime) {
		//@ts-ignore
		secondaryInput = options["unit"];
		//@ts-ignore
		delete options["unit"];
	}
	const hasOptions = Object.values(options).filter(v => v !== undefined).length > 0;
	const formattedOptions = hasOptions
		? `,\n${JSON.stringify(options, null, 2)}`
		: "";
	if (schema.method === "Collator") {
		return `const compareFunction = new Intl.${schema.method}("${locale}"${formattedOptions}).${formatter}

${JSON.stringify(schema.inputValue)}.sort(compareFunction)
`;
	}


	return `new Intl.${schema.method}("${locale}"${formattedOptions})${hasOptions ? "\n" : ""}.${formatter}(${input}${secondaryInput ? `, "${secondaryInput}"` : ""})
`;
}
