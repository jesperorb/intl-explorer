export enum Tabs {
  DateTimeFormat = "DateTimeFormat",
  NumberFormat = "NumberFormat",
  ListFormat = "ListFormat",
  RelativeTimeFormat = "RelativeTimeFormat",
  PluralRules = "PluralRules",
  Collator = "Collator",
}

export const tabEntries = Object.keys(Tabs).map((tab) => [tab, tab]);
