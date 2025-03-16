import type { Locator } from "@playwright/test";

import type { DarkMode } from "../../src/lib/store/settings";

import { expect } from "../test";

import { BasePage, type BasePageConfig } from "./BasePage";

export class SettingsPage extends BasePage {
	private heading!: Locator;

	private closeButton!: Locator;

	private settingsButton!: Locator;

	private themeModeRadioGroup!: Locator;

	private codeThemeRadioGroup!: Locator;

	private darkModeOption!: Locator;

	private lightModeOption!: Locator;

	private darkCodeThemeOption!: Locator;

	private lightCodeThemeOption!: Locator;

	private browserSupportCheckbox!: Locator;

	private languageSelect!: Locator;

	private confirmLanguageButton!: Locator;

	private colorSlider!: Locator;

	constructor(config: BasePageConfig) {
		super(config);
		this.setLocators();
	}

	private setLocators() {
		this.heading = this.page.getByRole("heading", {
			name: this.dictionary.settingsHeading,
			exact: true,
			level: 2
		});
		this.closeButton = this.page.getByRole("button", {
			name: this.dictionary.close,
			exact: true
		});
		this.themeModeRadioGroup = this.page.getByRole("radiogroup", {
			name: this.dictionary.theme,
			exact: true
		});
		this.codeThemeRadioGroup = this.page.getByRole("radiogroup", {
			name: this.dictionary.codeTheme,
			exact: true
		});
		this.darkModeOption = this.themeModeRadioGroup.getByRole("radio", {
			name: this.dictionary.dark,
			exact: true
		});
		this.lightModeOption = this.themeModeRadioGroup.getByRole("radio", {
			name: this.dictionary.light,
			exact: true
		});
		this.darkCodeThemeOption = this.codeThemeRadioGroup.getByRole("radio", {
			name: this.dictionary.dark,
			exact: true
		});
		this.lightCodeThemeOption = this.codeThemeRadioGroup.getByRole("radio", {
			name: this.dictionary.light,
			exact: true
		});
		this.settingsButton = this.page.getByRole("button", {
			name: this.dictionary.settingsButton,
			exact: true
		});
		this.browserSupportCheckbox = this.page.getByRole("checkbox", {
			name: this.dictionary.showBrowserSupport
		});
		this.languageSelect = this.page.getByRole("combobox", {
			name: this.dictionary.language,
			exact: true
		});
		this.confirmLanguageButton = this.page.getByRole("link", {
			name: this.dictionary.confirmLanguage,
			exact: true
		});
		this.colorSlider = this.page.getByRole("slider")
	}

	public override changeDictionaryLanguage(language: NonNullable<BasePageConfig["language"]>) {
		super.changeDictionaryLanguage(language);
		this.setLocators();
	}

	// --- Actions ---

	public async open() {
		await this.page.waitForLoadState("networkidle");
		await this.settingsButton.waitFor();
		await this.settingsButton.click();
		await this.heading.waitFor();
		await expect(this.heading).toBeVisible();
	}

	public async close() {
		await this.closeButton.click();
		await expect(this.heading).not.toBeVisible();
	}

	public async selectsThemeMode(mode: DarkMode) {
		if (mode === "dark") {
			await this.darkModeOption.check();
		} else {
			await this.lightModeOption.check();
		}
	}

	public async selectsCodeThemeMode(mode: DarkMode) {
		if (mode === "dark") {
			await this.darkCodeThemeOption.check();
		} else {
			await this.lightCodeThemeOption.check();
		}
	}

	public async togglesBrowserSupport(show: boolean) {
		if (show) {
			await this.browserSupportCheckbox.check();
			await expect(this.browserSupportCheckbox).toBeChecked();
		} else {
			await this.browserSupportCheckbox.uncheck();
			await expect(this.browserSupportCheckbox).not.toBeChecked();
		}
	}

	public async changesAccentColor(lengthOfDrag: number) {
		await this.dragElement({
			element: this.colorSlider,
			xOffset: lengthOfDrag,
			yOffset: 0,
		})
	}

	public async selectsLanguage(language: string) {
		await this.languageSelect.selectOption(language);
		await this.confirmLanguageButton.click();
	}

	// --- Assertions ---

	public async seesThemeMode(mode: DarkMode) {
		await expect(this.page.locator("html")).toHaveAttribute(`data-${mode}-mode`, "true");
		await expect(this.page.locator("body")).toHaveCSS(
			"background-color",
			mode === "light" ? "rgb(251, 245, 255)" : "rgb(20, 20, 20)"
		);
	}

	public async seesCodeThemeMode(mode: DarkMode) {
		if (mode === "light") {
			await expect(this.page.locator("html")).toHaveAttribute(`data-code-light-mode`, "true");
		} else {
			await expect(this.page.locator("html")).not.toHaveAttribute(`data-code-light-mode`, "true");
		}
	}

	public async seesDefaultAccentColor() {
		await expect(this.page.locator("html")).toHaveAttribute("style", `--accent-hue: 275;`);
		await expect(this.darkModeOption).toHaveCSS("background-color", "rgb(234, 204, 255)");
	}

	public async doesNotSeeDefaultAccentColor() {
		await expect(this.page.locator("html")).not.toHaveAttribute("style", `--accent-hue: 275;`);
		await expect(this.darkModeOption).not.toHaveCSS("background-color", "rgb(234, 204, 255)");
	}

	public async seesHeadingForLanguage(language: "sv" | "en") {
		await expect(
			this.page.getByRole("heading", {
				name: this.translations[language].settingsHeading
			})
		).toBeVisible();
	}
}
