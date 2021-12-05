import type { DateTimeFormatOptionsKeys } from "../options/datetime-format-options";

export const getFormatOptions = (
  option: DateTimeFormatOptionsKeys,
  value: any
): Partial<Intl.DateTimeFormatOptions> => {
  if (option === "fractionalSecondDigits") {
    return {
      [option as any]: value,
      second: "numeric",
    };
  }
  return {
    [option]: value,
  };
};

export const defaultNumberRange = [1, 2, 3, 4, 5];

export type FormatOptionsValues =
  | (string | undefined)[]
  | (boolean | undefined)[]
  | (number | undefined)[];
