/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormatMethodsKeys } from '$lib/format-methods';
import type { PlaygroundOption, PlaygroundSchema } from '$lib/playground/playground.schema';
import { schemas } from './schemas';

export const optionIsActive = <Method extends FormatMethodsKeys>(
	option: PlaygroundOption<Method>
) => {
	return option.selected !== undefined
		? option.selected
		: Boolean(option.value ?? option.defaultValue);
}

export const validateAndUpdateSchema = <Method extends FormatMethodsKeys>(
	schema: PlaygroundSchema<Method>
): PlaygroundSchema<Method> => {
	const templateSchema = schemas[schema.method as keyof typeof schemas];
	const templateSchemaOptions = [...templateSchema.options];
	const mappedSchemaOptions = Object.fromEntries(
		schema.options.map((option) => [option.name, option])
	);
	let invalidOptions: string[] | undefined = undefined;
	const options: PlaygroundOption<Method>[] = [];
	for (const option of templateSchemaOptions) {
		const value = mappedSchemaOptions[option.name]?.value;
		const selected = mappedSchemaOptions[option.name]?.selected;
		invalidOptions =
			templateSchema.invalidOptionCombos && !invalidOptions
				? templateSchema.invalidOptionCombos[`${option.name}:${value ?? option.defaultValue}`]
				: invalidOptions;
		options.push({
			...option,
			selected,
			value
		} as any);
	}
	const optionsWithoutInvalidOptions = invalidOptions
		? options.filter((option) => invalidOptions && !invalidOptions.includes(option.name as string))
		: options;
	// Special case for numberformat as the style property requires the unit property to be set
	const style = schema.method === "NumberFormat"
		? optionsWithoutInvalidOptions.find((option) => option.name === 'style')
		: undefined;
	if(style && style.value === 'unit') {
		const unit = optionsWithoutInvalidOptions.findIndex((option) => option.name === 'unit');
		if(unit && !optionsWithoutInvalidOptions[unit].value) {
			optionsWithoutInvalidOptions[unit].value = 'degree' as any;
		}
	}
	return {
		...schema,
		options: optionsWithoutInvalidOptions as PlaygroundOption<Method>[]
	};
};
