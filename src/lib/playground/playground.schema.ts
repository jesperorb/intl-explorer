/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormatMethodsKeys } from '$lib/format-methods';
import type { AllFormatOptions, AllMethods } from '$lib/format-options/types';

export type InputType = 'select' | 'text' | 'radio';
export type ValueType = 'string' | 'number' | 'boolean';
export type InputValueType = 'array' | 'date' | 'number' | 'string';

export type PlaygroundOption<
	Method extends FormatMethodsKeys,
	Options extends AllFormatOptions[Method] = AllFormatOptions[Method],
	Key extends keyof Options = keyof Options & string
> = {
	name: Key;
	valueType: ValueType;
	inputType: InputType;
	defaultValue: Options[Key];
	removeUndefined?: boolean;
	value?: Options[Key];
};

export type PlaygroundSchema<
	Method extends FormatMethodsKeys,
	Formatter = keyof AllMethods[Method]
> = {
	method: Method;
	primaryFormatter: Formatter;
	secondaryFormatters?: Formatter[];
	inputValues: any[];
	inputValueType: InputValueType;
	options: PlaygroundOption<Method>[];
	invalidOptionCombos?: {
		[path: string]: string[];
	};
};
