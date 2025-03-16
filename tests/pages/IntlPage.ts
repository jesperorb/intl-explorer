import type { Locator } from "@playwright/test";
import type { FormatMethodsKeys } from "../../src/lib/format-methods";
import { testIds } from "../../src/lib/utils/dom-utils";
import { BasePage, type BasePageConfig } from "./BasePage";
import { expect } from "../test";

export class IntlPage extends BasePage {
	private amountInput!: Locator;

	private dateInput!: Locator;

	private valueInput!: Locator;

	private listInput!: Locator;

	private localeTextInput!: Locator;

	private unitSelect!: Locator;

	private styleInput!: {
		long: Locator;
		short: Locator;
		narrow: Locator;
	};

	private numericInput!: {
		always: Locator;
		auto: Locator;
	};

	private typeInput!: {
		cardinal: Locator;
		ordinal: Locator;
	};

	private duration!: {
		years: Locator;
		months: Locator;
		weeks: Locator;
		days: Locator;
		hours: Locator;
		minutes: Locator;
		seconds: Locator;
		milliseconds: Locator;
		microseconds: Locator;
		nanoseconds: Locator;
	};

	private regionInput!: Locator;

	constructor(config: BasePageConfig) {
		super(config);
		this.setLocators();
	}

	private setLocators() {
		this.amountInput = this.page.getByRole("textbox", {
			name: this.dictionary.amount,
			exact: true
		});
		this.dateInput = this.page.getByLabel(this.dictionary.date, { exact: true });
		this.valueInput = this.page.getByRole("textbox", { name: this.dictionary.value, exact: true });
		this.listInput = this.page.getByRole("textbox", { name: this.dictionary.list, exact: true });
		this.localeTextInput = this.page.getByRole("textbox", {
			name: this.dictionary.locale,
			exact: true
		});
		this.unitSelect = this.page.getByRole("combobox", { name: this.dictionary.unit, exact: true });
		this.styleInput = {
			long: this.page.getByRole("radio", { name: "long", exact: true }),
			short: this.page.getByRole("radio", { name: "short", exact: true }),
			narrow: this.page.getByRole("radio", { name: "narrow", exact: true })
		};
		this.numericInput = {
			always: this.page.getByRole("radio", { name: "always", exact: true }),
			auto: this.page.getByRole("radio", { name: "auto", exact: true })
		};
		this.typeInput = {
			cardinal: this.page.getByRole("radio", { name: "cardinal", exact: true }),
			ordinal: this.page.getByRole("radio", { name: "ordinal", exact: true })
		};
		this.duration = {
			years: this.page.getByRole("textbox", { name: "years", exact: true }),
			months: this.page.getByRole("textbox", { name: "months", exact: true }),
			weeks: this.page.getByRole("textbox", { name: "weeks", exact: true }),
			days: this.page.getByRole("textbox", { name: "days", exact: true }),
			hours: this.page.getByRole("textbox", { name: "hours", exact: true }),
			minutes: this.page.getByRole("textbox", { name: "minutes", exact: true }),
			seconds: this.page.getByRole("textbox", { name: "seconds", exact: true }),
			milliseconds: this.page.getByRole("textbox", { name: "milliseconds", exact: true }),
			microseconds: this.page.getByRole("textbox", { name: "microseconds", exact: true }),
			nanoseconds: this.page.getByRole("textbox", { name: "nanoseconds", exact: true })
		};
		this.regionInput = this.page.getByRole("textbox", { name: "region", exact: true });
	}

	public override changeDictionaryLanguage(language: NonNullable<BasePageConfig["language"]>) {
		super.changeDictionaryLanguage(language);
		this.setLocators();
	}

	// --- Actions ---

	public async getOptionSection(option: string) {
		return this.page.getByTestId(testIds.optionSectionPrefix + option);
	}

	public async getOptionSectionCode(option: string, nth = 0) {
		return this.page.getByTestId(testIds.optionSectionPrefix + option).locator("pre").nth(nth);
	}

	// --- Assertions ---

	public async seesOptionOutput(option: string, output: string, nth = 0) {
		const locator = await this.getOptionSectionCode(option, nth);
		await expect(locator).toContainText(output);
	}

	public async changesValueAndSeesExpectedOutput(method: FormatMethodsKeys) {
		switch (method) {
			case "NumberFormat":
				await this.amountInput.fill("22.33");
				await this.seesOptionOutput("unitDisplay", "22.33");
				await this.changesLocale("sv-SE");
				await this.seesOptionOutput("unitDisplay", "22,33");
				await this.removedSelectedLocale("sv-SE");
				break;
			case "DateTimeFormat":
				// Shitty datepicker
				break;
			case "RelativeTimeFormat":
				await this.valueInput.fill("3");
				await this.seesOptionOutput("unit", "in 3 years");
				await this.changesLocale("sv-SE");
				await this.seesOptionOutput("unit", "om 3 år");
				await this.removedSelectedLocale("sv-SE");
				break;
			case "ListFormat":
				await this.listInput.fill("cat,hat");
				await this.seesOptionOutput("type", "cat and hat")
				await this.changesLocale("sv-SE");
				await this.seesOptionOutput("type", "cat och hat");
				await this.removedSelectedLocale("sv-SE");
				break;
			case "PluralRules":
				await this.seesOptionOutput("cardinal", "other", 1);
				await this.typeInput.ordinal.check();
				await this.seesOptionOutput("ordinal", "two", 1);
				await this.changesLocale("sv-SE");
				await this.seesOptionOutput("ordinal", "one", 1);
				await this.removedSelectedLocale("sv-SE");
				break;
			case "Collator":
				await this.listInput.fill("ä,z");
				await this.seesOptionOutput("usage", "ä,z");
				await this.changesLocale("sv-SE");
				await this.seesOptionOutput("usage", "z,ä");
				await this.removedSelectedLocale("sv-SE");
				break;
			case "Segmenter":
				await this.listInput.fill("word");
				await this.seesOptionOutput("granularity", `[
					{
						"segment": "word",
						"index": 0,
						"input": "word",
						"isWordLike": true
					}
				]`);
				break;
			case "DisplayNames":
				await this.seesOptionOutput("region", "United States");
				await this.regionInput.fill("SE")
				await this.seesOptionOutput("region", "Sweden");
				await this.changesLocale("sv-SE");
				await this.seesOptionOutput("region", "Sverige");
				await this.removedSelectedLocale("sv-SE");
				break;
			case "DurationFormat":
				await this.seesOptionOutput("style", "2 years, 1 month, 46 days");
				await this.duration.years.fill("5")
				await this.seesOptionOutput("style", "5 years, 1 month, 46 days");
				await this.changesLocale("sv-SE");
				await this.seesOptionOutput("style", "5 år, 1 månad, 46 dygn");
				await this.removedSelectedLocale("sv-SE");
			default:
				break;
		}
	}
}
