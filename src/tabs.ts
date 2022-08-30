export enum Tabs {
  DateTimeFormat = "DateTimeFormat",
  NumberFormatCurrency = "NumberFormatCurrency",
  NumberFormatUnit = "NumberFormatUnit",
  ListFormat = "ListFormat",
  RelativeTimeFormat = "RelativeTimeFormat",
  PluralRules = "PluralRules",
  Collator = "Collator",
  Segmenter = "Segmenter",
}

export const tabEntries = Object.keys(Tabs).map((tab) => [tab, tab]);
