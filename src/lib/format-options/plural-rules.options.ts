import { defaultNumberRange } from "$utils/format-utils";
import {
	localeMatcher,
	roundingIncrement,
	roundingMode,
	roundingPriority,
	trailingZeroDisplay
} from "$lib/format-options/common.options";
import type { CreateOptions, NumberOrUndefinedTuple } from "$types/common";

export type PluralRulesOptions = CreateOptions<Intl.PluralRulesOptions>;

export const pluralRulesFormatOptions: PluralRulesOptions = {
	type: ["cardinal", "ordinal", undefined],
	minimumIntegerDigits: [...defaultNumberRange, undefined] as NumberOrUndefinedTuple,
	minimumFractionDigits: [...defaultNumberRange, undefined] as NumberOrUndefinedTuple,
	maximumFractionDigits: [...defaultNumberRange, undefined] as NumberOrUndefinedTuple,
	minimumSignificantDigits: [...defaultNumberRange, undefined] as NumberOrUndefinedTuple,
	maximumSignificantDigits: [...defaultNumberRange, undefined] as NumberOrUndefinedTuple,
	roundingIncrement,
	roundingMode,
	roundingPriority,
	trailingZeroDisplay,
	localeMatcher
};
