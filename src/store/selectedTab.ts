import { writable } from "svelte/store";

import { Tabs } from "../tabs";

const key = "selectedTab";

const stored = localStorage.getItem(key);

export const selectedTab = writable(stored || Tabs.DateTimeFormat);

selectedTab.subscribe((value) => localStorage.setItem(key, value));
