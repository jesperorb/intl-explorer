import { browser } from "$app/environment";
import { writable } from "svelte/store";

export type DarkMode = "dark" | "light";

type HintKeys =
	| "codeThemeHint"
	| "themeHint"
	| "showBrowserSupportHint"
	| "accentColorHint"
	| "announceOutputToScreenreaderHint";

type Setting<Value> = {
	type: "radio" | "checkbox" | "color";
	values: Value[];
	hint?: HintKeys;
};

type SettingsConfiguration = {
	codeTheme: Setting<DarkMode>;
	theme: Setting<DarkMode>;
	showBrowserSupport: Setting<boolean>;
	announceOutputToScreenreader: Setting<boolean>;
	accentColor: Setting<string>;
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
	},
	accentColor: {
		type: "color",
		values: ["275"],
		hint: "accentColorHint"
	},
	announceOutputToScreenreader: {
		type: "checkbox",
		values: [true],
		hint: "announceOutputToScreenreaderHint"
	}
};

export type Settings = {
	codeTheme: DarkMode;
	theme: DarkMode;
	showBrowserSupport: boolean;
	accentColor: string;
	announceOutputToScreenreader: boolean;
};

const defaultSettings: Settings = {
	codeTheme: "dark",
	theme: "light",
	showBrowserSupport: true,
	accentColor: "275",
	announceOutputToScreenreader: true,
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
		const htmlElement = document.querySelector("html");
		htmlElement?.setAttribute(`data-${value.theme}-mode`, "true");
		htmlElement?.removeAttribute(`data-${value.theme === "dark" ? "light" : "dark"}-mode`);
		if (value.codeTheme === "light") {
			document.querySelector("html")?.setAttribute("data-code-light-mode", "true");
		} else if (value.codeTheme === "dark") {
			document.querySelector("html")?.removeAttribute("data-code-light-mode");
		}
		if (value.accentColor) {
			document.documentElement.style.setProperty("--accent-hue", value.accentColor);
		}
		localStorage.setItem(settingsLocalStorageKey, JSON.stringify(value));
	}
});
