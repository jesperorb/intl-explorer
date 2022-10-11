import type { FormatMethodsKeys } from "$lib/format-methods";
import type { AllFormatOptions } from "$lib/format-options/types";
import type { PlaygroundOption, PlaygroundSchema } from "./playground.schema";

import { formatOptions } from "$lib/format-options";

export const print = (values: unknown) => {
	return JSON.stringify(values, null, 2);
}

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

const prepareSchemaForOutput =  <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>,
) => {
	const options = schemaToFormatOptions(schema);
	const hasOptions = Object.values(options).filter(v => v !== undefined).length > 0;
	return {
		// Casting to something generic so every formatter can accept options
		options: options as Record<string, string>,
		hasOptions,
	}
}

const prepareInputValues = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>
) =>  schema.inputValueType === "date"
	? schema.inputValues.map(v => new Date(v))
	: [...schema.inputValues];

export const schemaToPrimaryFormatterOutput = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>,
	locale: string,
) => {
	const { options, } = prepareSchemaForOutput(schema);
	if (schema.method === "Collator") {
		const formattedString = (schema.inputValues[0]).sort(new Intl.Collator(
			locale,
			options
		).compare)
		return `${formattedString}`
	}
	// Casting to specific formatter to circumvent type errors, the types are too dynamic
	const primaryFormatter = schema.primaryFormatter as "formatToParts";
	const formatted = (new Intl[schema.method](
		locale,
		options
	) as Intl.DateTimeFormat)[primaryFormatter](...prepareInputValues(schema))
	if(schema.method === "Segmenter") {
		return `${print(Array.from(formatted))}`
	}
	return `${formatted}`
}

export const schemaToSecondaryFormattersOutput = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>,
	locale: string,
) => {
	const { options } = prepareSchemaForOutput(schema);
	return schema.secondaryFormatters?.map(formatter => {
		try {
			const output = (new Intl[schema.method](
				locale,
				options
			) as Intl.DateTimeFormat)[(formatter as "formatToParts")](...prepareInputValues(schema))
			return {
				name: formatter,
				output: print(output)
			}
		} catch(_error) {
			return {
				name: formatter,
				output: "Your browser does not support this."
			}
		}
	}) ?? [];
}

export const schemaToResolvedOptions = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>,
	locale: string,
) => {
	const { options } = prepareSchemaForOutput(schema);
	const intlObject = (new Intl[schema.method](
		locale,
		options
	) as Intl.PluralRules);
	return `${print(intlObject.resolvedOptions())}`
}

export const schemaToCode = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>,
	locale: string
) => {
	const { options, hasOptions } = prepareSchemaForOutput(schema);
	const stringInput = JSON.stringify(schema.inputValues[0]);
	const formatter = String(schema.primaryFormatter);
	const formattedOptions = hasOptions
		? `,\n${print(options)}`
		: "";
	if (schema.method === "Collator") {
		return `const compareFunction = new Intl.${schema.method}("${locale}"${formattedOptions}).${formatter}

${stringInput}.sort(compareFunction)
`;
	}
	return `new Intl.${schema.method}("${locale}"${formattedOptions})${hasOptions ? "\n" : ""}.${formatter}(${stringInput})
`;
}
