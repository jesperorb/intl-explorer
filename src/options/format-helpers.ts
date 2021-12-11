import type { DateTimeFormatOptionsKeys } from "../options/datetime-format-options";

export const getFormatOptions = (
  option: DateTimeFormatOptionsKeys,
  value: string | boolean | number
): Partial<Intl.DateTimeFormatOptions> => {
  if (option === "fractionalSecondDigits") {
    return {
      [option as DateTimeFormatOptionsKeys]: value as number,
      second: "numeric",
    };
  }
  if (option === "hour12" || option == "hourCycle") {
    return {
      [option as DateTimeFormatOptionsKeys]: value as number,
      timeStyle: "medium",
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
