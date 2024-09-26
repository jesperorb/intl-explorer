import { currencies } from "$lib/locale-data/currencies";
import { units } from "$lib/locale-data/units";
import { defaultNumberRange } from "$utils/format-utils";
import {
	localeMatcher,
	roundingIncrement,
	roundingMode,
	roundingPriority,
	trailingZeroDisplay,
	style
} from "$lib/format-options/common.options";
import type { CreateOptions } from "$types/common";

export type NumberFormatOptions = CreateOptions<Intl.NumberFormatOptions>;

export const numberFormatOptionsCommon = {
	style: ["currency", "unit"],
	signDisplay: ["auto", "never", "always", "exceptZero", undefined],
	useGrouping: [true, false, undefined],
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
};

export const numberFormatOptionsCurrency: NumberFormatOptions = {
	currencySign: ["standard", "accounting", undefined],
	currencyDisplay: ["code", "symbol", "narrowSymbol", "name", undefined],
	currency: Object.keys(currencies) as [string | undefined, string | undefined]
};

export const numberFormatOptionsUnit: NumberFormatOptions = {
	unit: units as [string | undefined, string | undefined],
	unitDisplay: style,
	compactDisplay: ["short", "long", undefined],
	notation: ["standard", "scientific", "engineering", "compact", undefined]
};
