export enum Tabs {
  DateTimeFormat = "DateTimeFormat",
  NumberFormat = "NumberFormat",
}

export const tabEntries = Object.keys(Tabs).map((tab) => [tab, tab]);
