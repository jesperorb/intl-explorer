export enum Tabs {
  DateTimeFormat = "DateTimeFormat",
  NumberFormat = "NumberFormat",
  ListFormat = "ListFormat",
}

export const tabEntries = Object.keys(Tabs).map((tab) => [tab, tab]);
