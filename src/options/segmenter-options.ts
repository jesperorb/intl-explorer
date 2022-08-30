import type { FormatOptionsValues } from "@utils/format-utils";

export type SegmenterOptionsKeys = keyof Intl.SegmenterOptions;

export const segmenterOptions = new Map<
  SegmenterOptionsKeys,
  FormatOptionsValues
>([
  ["granularity", ["word", "sentence", "grapheme" , undefined]],
  ["localeMatcher", [ "best fit" , "lookup" , undefined]],
]);
