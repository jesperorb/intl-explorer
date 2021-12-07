export enum Tabs {
  DateTimeFormat = "DateTimeFormat",
  NumberFormat = "NumberFormat",
  ListFormat = "ListFormat",
  RelativeTimeFormat = "RelativeTimeFormat",
  PluralRules = "PluralRules",
}

export const tabEntries = Object.keys(Tabs).map((tab) => [tab, tab]);
