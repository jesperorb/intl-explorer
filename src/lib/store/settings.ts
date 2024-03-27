import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type DarkMode = "dark" | "light";

type Setting<Value> = {
  type: "radio",
  values: Value[],
  hint?: string;
}

type SettingsConfiguration = {
  codeTheme: Setting<DarkMode>
  theme: Setting<DarkMode>
}

export const settingsConfiguration: SettingsConfiguration = {
  codeTheme: {
    type: 'radio',
    values: ["dark", "light"],
    hint: "Theme for Code Block: Oceanic Next/GitHub"
  },
  theme: {
    type: 'radio',
    values: ["dark", "light"],
    hint: "Page theme",
  }
}

type Settings = {
  codeTheme: DarkMode;
  theme: DarkMode;
}

const defaultSettings: Settings  = {
  codeTheme: "dark",
  theme: 'light'
}

export const settingsKeys = Object.keys(defaultSettings) as (keyof Settings)[]

export const settingsLocalStorageKey = "intl-explorer-settings";

const getSettings = () => {
  if(!browser) return defaultSettings;
  const stored = localStorage.getItem(settingsLocalStorageKey);
  if(!stored) return defaultSettings;
  return {
    ...defaultSettings,
    ...JSON.parse(stored)
  } as Settings;
}

export const settings = writable(getSettings());

settings.subscribe((value) => {
	if (browser) {
    if(value.theme === "dark") {
			document.querySelector("html")?.setAttribute("data-dark-mode", "true");
		} else if(value.theme === "light") {
      document.querySelector("html")?.removeAttribute("data-dark-mode");
    }
		if(value.codeTheme === "light") {
			document.querySelector("html")?.setAttribute("data-code-light-mode", "true");
		} else if (value.codeTheme === "dark") {
      document.querySelector("html")?.removeAttribute("data-code-light-mode");
    }
		localStorage.setItem(settingsLocalStorageKey, JSON.stringify(value))
	}
});
