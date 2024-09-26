import { style, localeMatcher } from "$lib/format-options/common.options";
import type { CreateOptions } from "$types/common";

export type DateTimeFormatOptions = CreateOptions<Intl.DisplayNamesOptions>;

const type: (Intl.DisplayNamesType | undefined)[] = [
	"language",
	"region",
	"script",
	"calendar",
	"dateTimeField",
	"currency",
	undefined
];

export const displayNamesOptions: DateTimeFormatOptions = {
	style,
	type: type as [
		Intl.DisplayNamesType,
		Intl.DisplayNamesType,
		Intl.DisplayNamesType,
		Intl.DisplayNamesType,
		Intl.DisplayNamesType,
		Intl.DisplayNamesType
	],
	languageDisplay: ["dialect", "standard", undefined],
	fallback: ["code", "none", undefined],
	localeMatcher
};
