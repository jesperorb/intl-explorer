import type { FormatOptionsValues } from "./format-helpers";

export type RelativeTimeFormatOptionsKeys =
  | "numeric"
  | "style"
  | "localeMatcher";

export const relativeTimeFormatOptions = new Map<
  RelativeTimeFormatOptionsKeys,
  FormatOptionsValues
>([
  ["numeric", ["always", "auto", undefined]],
  ["style", ["long", "short", "narrow", undefined]],
  ["localeMatcher", ["best fit", "lookup", undefined]],
]);

export type RelativeTimeFormatUnit =
  | "year"
  | "years"
  | "quarter"
  | "quarters"
  | "month"
  | "months"
  | "week"
  | "weeks"
  | "day"
  | "days"
  | "hour"
  | "hours"
  | "minute"
  | "minutes"
  | "second"
  | "seconds";

export const relativeTimeFormatUnits: RelativeTimeFormatUnit[] = [
  "year",
  "years",
  "quarter",
  "quarters",
  "month",
  "months",
  "week",
  "weeks",
  "day",
  "days",
  "hour",
  "hours",
  "minute",
  "minutes",
  "second",
  "seconds",
];
