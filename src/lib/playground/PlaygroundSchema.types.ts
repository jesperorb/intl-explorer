import type { FormatMethodsKeys } from "$lib/format-methods"
import type { AllFormatOptions } from "$lib/format-options/types";

export type InputType = "select" | "text" | "radio";
export type ValueType = "string" | "number" | "boolean";

export type PlaygroundOption<
	Method extends FormatMethodsKeys,
	Options extends AllFormatOptions[Method] = AllFormatOptions[Method],
	Key extends keyof Options = keyof Options> = {
		name: Key;
		valueType: ValueType;
		inputType: InputType;
		defaultValue: Options[Key];
	}

export type PlaygroundSchema<Method extends FormatMethodsKeys> = {
	method: Method;
	options: PlaygroundOption<Method>[];
}
