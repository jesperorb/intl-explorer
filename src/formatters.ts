import type { DateTimeFormatOptionsKeys } from "./locales/datetime-format-options";

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
