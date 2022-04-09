import type { FormatOptionsValues } from "@utils/format-utils";

export type ListFormatOptionsKeys = "type" | "style";

export const listFormatOptions = new Map<ListFormatOptionsKeys, FormatOptionsValues>([
  ["type", ["conjunction", "disjunction", "unit", undefined]],
  ["style", ["long", "short", "narrow", undefined]],
]);
