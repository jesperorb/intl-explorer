import { calendars, numberingSystems } from "@locale-data/calendars";
import type { FormatOptionsValues } from "@utils/format-utils";

export type DateTimeFormatOptionsKeys =
  | keyof Intl.DateTimeFormatOptions
  | "fractionalSecondDigits";

export const datetimeFormatOptions = new Map<
  DateTimeFormatOptionsKeys,
  FormatOptionsValues
>([
  ["dateStyle", [undefined, "full", "long", "medium", "short"]],
  ["timeStyle", [undefined, "full", "long", "medium", "short"]],
  ["year", ["numeric", "2-digit", undefined]],
  ["month", ["numeric", "2-digit", "long", "short", "narrow", undefined]],
  ["day", ["numeric", "2-digit", undefined]],
  ["hour", ["numeric", "2-digit", undefined]],
  ["minute", ["numeric", "2-digit", undefined]],
  ["second", ["numeric", "2-digit", undefined]],
  ["weekday", ["long", "short", "narrow", undefined]],
  ["era", ["long", "short", "narrow", undefined]],
  ["hour12", [true, false, undefined]],
  ["hourCycle", ["h11", "h12", "h23", "h24", undefined]],
  ["dayPeriod", ["narrow", "short", "long", undefined]],
  ["fractionalSecondDigits", [1, 2, 3, undefined]],
  ["calendar", [undefined, ...calendars]],
  ["numberingSystem", [undefined, ...numberingSystems]],
  ["timeZoneName", ["long", "short", undefined]],
  ["localeMatcher", ["best fit", "lookup", undefined]],
  ["formatMatcher", ["best fit", "basic", undefined]],
]);
