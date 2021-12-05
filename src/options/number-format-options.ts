import { currencyKeys } from "../locale-data/currencies";
import { units } from "../locale-data/units";
import { defaultNumberRange, FormatOptionsValues } from "./format-helpers";

type NumberFormatOptionsKeys = keyof Intl.NumberFormatOptions;

/**
 * https://tc39.es/ecma402/#sec-intl.numberformat.prototype
 */
export const NumberFormatOptions = new Map<
  NumberFormatOptionsKeys,
  FormatOptionsValues
>([
  ["style", ["decimal", "percent", "currency", "unit", undefined]],
  ["unit", [...units, undefined]],
  ["currency", [...currencyKeys, undefined]],
  ["currencySign", ["standard", "accounting", undefined]],
  ["currencyDisplay", ["code", "symbol", "narrowSymbol", "name", undefined]],
  ["unitDisplay", ["short", "long", "narrow", undefined]],
  ["compactDisplay", ["short", "long", undefined]],
  ["signDisplay", ["auto", "never", "always", "exceptZero", undefined]],
  ["notation", ["standard", "scientific", "engineering", "compact", undefined]],
  ["useGrouping", [true, false, undefined]],
  ["minimumIntegerDigits", [...defaultNumberRange, undefined]],
  ["minimumFractionDigits", [...defaultNumberRange, undefined]],
  ["maximumFractionDigits", [...defaultNumberRange, undefined]],
  ["minimumSignificantDigits", [...defaultNumberRange, undefined]],
  ["maximumSignificantDigits", [...defaultNumberRange, undefined]],
  ["localeMatcher", ["best fit", "lookup", undefined]],
]);
