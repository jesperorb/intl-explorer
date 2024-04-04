import { browser } from "$app/environment";
import { writable } from "svelte/store";

export type DarkMode = "dark" | "light";

type HintKeys = "codeThemeHint" | "themeHint" | "showBrowserSupportHint";

type Setting<Value> = {
	type: "radio" | "checkbox";
	values: Value[];
	hint?: HintKeys;
};

type SettingsConfiguration = {
	codeTheme: Setting<DarkMode>;
	theme: Setting<DarkMode>;
	showBrowserSupport: Setting<boolean>;
};

export const settingsConfiguration: SettingsConfiguration = {
	codeTheme: {
		type: "radio",
		values: ["dark", "light"],
		hint: "codeThemeHint"
	},
	theme: {
		type: "radio",
		values: ["dark", "light"],
		hint: "themeHint"
	},
	showBrowserSupport: {
		type: "checkbox",
		values: [true],
		hint: "showBrowserSupportHint"
	}
};

export type Settings = {
	codeTheme: DarkMode;
	theme: DarkMode;
	showBrowserSupport: boolean;
};

const defaultSettings: Settings = {
	codeTheme: "dark",
	theme: "light",
	showBrowserSupport: true
};

export const settingsKeys = Object.keys(defaultSettings) as (keyof Settings)[];

export const settingsLocalStorageKey = "intl-explorer-settings";

const getSettings = () => {
	if (!browser) return defaultSettings;
	const stored = localStorage.getItem(settingsLocalStorageKey);
	if (!stored) return defaultSettings;
	return {
		...defaultSettings,
		...JSON.parse(stored)
	} as Settings;
};

export const settings = writable(getSettings());

settings.subscribe((value) => {
	if (browser) {
		if (value.theme === "dark") {
			document.querySelector("html")?.setAttribute("data-dark-mode", "true");
		} else if (value.theme === "light") {
			document.querySelector("html")?.removeAttribute("data-dark-mode");
		}
		if (value.codeTheme === "light") {
			document.querySelector("html")?.setAttribute("data-code-light-mode", "true");
		} else if (value.codeTheme === "dark") {
			document.querySelector("html")?.removeAttribute("data-code-light-mode");
		}
		localStorage.setItem(settingsLocalStorageKey, JSON.stringify(value));
	}
});
