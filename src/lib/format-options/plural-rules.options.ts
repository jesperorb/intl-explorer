import { defaultNumberRange } from "$utils/format-utils";
import {
	localeMatcher,
	roundingIncrement,
	roundingMode,
	roundingPriority,
	trailingZeroDisplay
} from "$lib/format-options/common.options";

export const pluralRulesFormatOptions = {
	type: ["cardinal", "ordinal", undefined],
	minimumIntegerDigits: [...defaultNumberRange, undefined],
	minimumFractionDigits: [...defaultNumberRange, undefined],
	maximumFractionDigits: [...defaultNumberRange, undefined],
	minimumSignificantDigits: [...defaultNumberRange, undefined],
	maximumSignificantDigits: [...defaultNumberRange, undefined],
	roundingIncrement,
	roundingMode,
	roundingPriority,
	trailingZeroDisplay,
	localeMatcher
} as const;
