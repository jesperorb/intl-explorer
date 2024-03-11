import { defaultNumberRange } from '$lib/utils/format-utils';
import { style, localeMatcher } from './common.options';

export const durationFormatOptions = {
  style,
  years: style,
  months: style,
  weeks: style,
  days: style,
  hours: style,
  minutes: style,
  seconds: style,
  milliseconds: style,
  microseconds: style,
  nanoseconds: style,
  fractionalDigits: [...defaultNumberRange, undefined],
  localeMatcher
} as const;

export const durationValues: (keyof Intl.Duration)[] = [
  "years",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds",
  "microseconds",
  "nanoseconds"
];