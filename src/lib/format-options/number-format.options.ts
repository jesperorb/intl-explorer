import { defaultNumberRange } from '$lib/utils/format-utils';
import type { FormatOptionsValues } from '$lib/utils/format-utils';

type NumberFormatOptionsKeys = keyof Intl.NumberFormatOptions;

export const numberFormatOptionsCommon = new Map<NumberFormatOptionsKeys, FormatOptionsValues>([
	['signDisplay', ['auto', 'never', 'always', 'exceptZero', undefined]],
	['useGrouping', [true, false, undefined]],
	['minimumIntegerDigits', [...defaultNumberRange, undefined]],
	['minimumFractionDigits', [...defaultNumberRange, undefined]],
	['maximumFractionDigits', [...defaultNumberRange, undefined]],
	['minimumSignificantDigits', [...defaultNumberRange, undefined]],
	['maximumSignificantDigits', [...defaultNumberRange, undefined]],
	['localeMatcher', ['best fit', 'lookup', undefined]]
]);

/**
 * These are the options when style is set to `currency`
 * AND a currency is supplied.
 */
export const numberFormatOptionsCurrency = new Map<NumberFormatOptionsKeys, FormatOptionsValues>([
	['currencySign', ['standard', 'accounting', undefined]],
	['currencyDisplay', ['code', 'symbol', 'narrowSymbol', 'name', undefined]],
	...numberFormatOptionsCommon
]);

export const numberFormatOptionsUnit = new Map<NumberFormatOptionsKeys, FormatOptionsValues>([
	['unitDisplay', ['short', 'long', 'narrow', undefined]],
	['compactDisplay', ['short', 'long', undefined]],
	['notation', ['standard', 'scientific', 'engineering', 'compact', undefined]],
	...numberFormatOptionsCommon
]);
