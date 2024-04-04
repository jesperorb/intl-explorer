/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormatMethodsKeys } from "$lib/format-methods";
import type { AllFormatOptions } from "$lib/format-options/types";
import type { PlaygroundOption, PlaygroundSchema } from "$lib/playground/playground.schema";

import { formatOptions } from "$lib/format-options";
import { durationValues } from "$lib/format-options/duration-format.options";
import { optionIsActive } from "$lib/playground/validate";
import { clampValue, fallbackDisplayNames, tryFormat, print, formatLocalesForPrint } from "$lib/utils/format-utils";

export const updateOptionOnSchema = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>,
	event: Event
) => {
	const target = event.target as HTMLInputElement;
	const isRadioEvent = target.type === 'radio';
	const isCheckBox = target.type === 'checkbox';
	const optionName = target.name.replace("_active", "");
	const optionValue =  target.value;
	const radioValue = optionValue === 'true' ? true : optionValue === 'false' ? false : undefined;
	const value = isRadioEvent ? radioValue : optionValue;
	const schemaOptions = schema.options.map((option) =>
		option.name === optionName && !isCheckBox
			? {
				...option,
				value: clampValue(option, value)
			}
			: {
				...option,
				selected: option.name === optionName ? target.checked : option.selected
			}
	);
	const newSchema: PlaygroundSchema<Method> = {
		...schema,
		options: schemaOptions as unknown as PlaygroundOption<Method>[]
	};
	const isRelativeTimeUnit =
		(schema.method as FormatMethodsKeys) === 'RelativeTimeFormat' && optionName === 'unit';
	const isDisplayNamesType =
		(schema.method as FormatMethodsKeys) === 'DisplayNames' && optionName === 'type';
	if (isRelativeTimeUnit) {
		newSchema.inputValues[1] = optionValue;
	}
	if (isDisplayNamesType) {
		newSchema.inputValues[0] = fallbackDisplayNames[value as unknown as Intl.DisplayNamesType];
	}
	return newSchema;
}

export const schemaToFormatOptions = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>
) => {
	const formatOptions: Partial<AllFormatOptions[Method]> = {};
	for (const option of schema.options) {
		const value = option.value ?? option.defaultValue;
		if (optionIsActive(option)) {
			formatOptions[option.name] = value === "" ? undefined : value;
		}
	}
	return formatOptions as AllFormatOptions[Method];
}

export const getItemsFromOption = <Method extends FormatMethodsKeys>(
	method: Method,
	option: PlaygroundOption<Method>
) => {
	const optionsForMethod = formatOptions[method];
	const name = option.name as keyof typeof optionsForMethod;
	const options = optionsForMethod[name] as (string|boolean|number|undefined)[];
	return options?.map((option) => [option, option]) ?? [];
};

const prepareSchemaForOutput = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>,
) => {
	const options = schemaToFormatOptions(schema);
	const hasOptions = Object.values(options).filter(v => v !== undefined).length > 0;
	return {
		options: options as Record<string, string>,
		hasOptions,
	}
}

export const formatDurationFormatValues = (
	inputValues: any[]
) =>
	Object.fromEntries(
		durationValues.map((duration, i) => [duration, Number(inputValues[0][i] ?? 0)])
	)

export const prepareInputValues = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>
) => {
	if (schema.inputValueType === "date") {
		return schema.inputValues.map(v => new Date(v))
	}
	if (schema.method === "DurationFormat") {
		return [formatDurationFormatValues(schema.inputValues)]
	}
	return [...schema.inputValues];
};

export const schemaToPrimaryFormatterOutput = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>,
	locale: string[],
) => {
	const { options } = prepareSchemaForOutput(schema);
	return tryFormat(() => {
		if (schema.method === "Collator") {
			const formattedString = (schema.inputValues[0]).sort(new Intl.Collator(
				locale,
				options
			).compare)
			return `${formattedString}`
		}
		//@ts-expect-error too complex type to handle correctly
		const formatted = (new Intl[schema.method](
			locale,
			options
		))[schema.primaryFormatter](...prepareInputValues(schema))
		if (schema.method === "Segmenter") {
			return `${print(Array.from(formatted))}`
		}
		return `${formatted}`
	})
}

export const schemaToSecondaryFormattersOutput = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>,
	locale: string[],
) => {
	const { options } = prepareSchemaForOutput(schema);
	return schema.secondaryFormatters?.map(formatter => {
		return {
			name: formatter,
			//@ts-expect-error too complex type to handle correcty
			output: tryFormat(() => print((new Intl[schema.method](
				locale,
				options
			))[formatter](...prepareInputValues(schema))))
		}
	}) ?? [];
}

export const schemaToResolvedOptions = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>,
	locale: string[],
) => {
	const { options } = prepareSchemaForOutput(schema);
	return tryFormat(() => {
		//@ts-expect-error too complex type
		const intlObject = (new Intl[schema.method](
			locale,
			options
		) as Intl.PluralRules);
		return `${print(intlObject.resolvedOptions())}`
	})
}

export const schemaToCode = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>,
	locale: string[]
) => {
	const { options, hasOptions } = prepareSchemaForOutput(schema);
	const stringInput = JSON.stringify(schema.inputValues[0]);
	const formatter = String(schema.primaryFormatter);
	const formattedOptions = hasOptions
		? `,\n${print(options)}`
		: "";
	if (schema.method === "Collator") {
		return `const compareFunction = new Intl.${schema.method}(${formatLocalesForPrint(locale)}${formattedOptions}).${formatter}

${stringInput}.sort(compareFunction)
`;
	}
	const formattedInput = schema.method === "DurationFormat"
		? print(formatDurationFormatValues(schema.inputValues))
		: stringInput;
	return `new Intl.${schema.method}(${formatLocalesForPrint(locale)}${formattedOptions})${hasOptions ? "\n" : ""}.${formatter}(${formattedInput})
`;
}
