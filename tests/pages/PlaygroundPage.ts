import type { Locator } from "@playwright/test";
import { testIds } from "../../src/lib/utils/dom-utils";
import type { FormatMethodsKeys } from "../../src/lib/format-methods";
import { invalidOptions } from "../../src/lib/playground/schemas/dateTimeFormat.schema";

import { expect } from "../test";

import { BasePage, type BasePageConfig } from "./BasePage";

export class PlaygroundPage extends BasePage {
	private methodInput: Locator;

	private valueInput: Locator;

	private dateInput: Locator;

	private timeInput: Locator;

	private output: Locator;

	private code: Locator;

	private resolvedOptions: Locator;

	private copyCodeButton: Locator;

	private secondaryFormattersHeading: Locator;

	constructor(config: BasePageConfig) {
		super(config);
		this.methodInput = this.page.getByRole("combobox", { name: this.dictionary.method, exact: true });
		this.valueInput = this.page.getByRole("textbox", { name: this.dictionary.value, exact: true });
		this.dateInput = this.page.getByLabel(this.dictionary.date, { exact: true });
		this.timeInput = this.page.getByLabel(this.dictionary.time, { exact: true });
		this.output = this.page.getByTestId(testIds.playground.output);
		this.code = this.page.getByTestId(testIds.playground.code);
		this.resolvedOptions = this.page.getByTestId(testIds.playground.resolvedOptions);
		this.copyCodeButton = this.page.getByRole("button", { name: this.dictionary.copyCode, exact: true });
		this.secondaryFormattersHeading = this.page.getByRole("heading", {
			level: 2,
			name: this.dictionary.secondaryFormatters,
			exact: true
		});
	}

	// --- Actions ---

	public async selectsMethod(method: FormatMethodsKeys) {
		await this.methodInput.selectOption(method);
	}

	public async clearsValue() {
		await this.valueInput.clear();
	}

	public async changesInputValue(value: string, clear?: boolean) {
		await this.valueInput.focus();
		if (clear) {
			await this.clearsValue();
		}
		await this.page.keyboard.type(value);
	}

	public async changesDateAndTimeInputValue({
		year,
		month,
		day,
		hours,
		minutes
	}: {
		year: string;
		month: string;
		day: string;
		hours?: string;
		minutes?: string;
	}) {
		await this.dateInput.focus();
		await this.page.keyboard.type(year);
		await this.page.keyboard.press("ArrowRight");
		await this.page.keyboard.type(month);
		await this.page.keyboard.press("ArrowRight");
		await this.page.keyboard.type(day);
		if (hours && minutes) {
			await this.page.keyboard.press("Tab");
			await this.page.keyboard.type(hours);
			await this.page.keyboard.type(minutes);
		}
	}

	public async changesOption(name: string, value: string) {
		await this.page.getByRole("combobox", { name, exact: true }).selectOption(value);
	}

	public async checksOption(name: string) {
		await this.page.getByRole("checkbox", { name: `${name} active`, exact: true }).check();
	}

	public async unchecksOption(name: string) {
		await this.page.getByRole("checkbox", { name: `${name} active`, exact: true }).uncheck();
	}

	public async copiesCode() {
		await this.copyCodeButton.click();
	}

	// --- Assertions ---

	public async seesInputValue(value: string) {
		await expect(this.valueInput).toHaveValue(value);
	}

	public async seesDateInputValue(value: string) {
		await expect(this.dateInput).toHaveValue(value);
	}

	public async seesTimeInputValue(value: string) {
		await expect(this.timeInput).toHaveValue(value);
	}

	public async seesOutput(output: string) {
		await expect(this.output).toContainText(output);
	}

	public async seesCode(code: string) {
		await expect(this.code).toContainText(code);
	}

	public async seesResolvedOptions(code: string) {
		await expect(this.resolvedOptions).toContainText(code);
	}

	public async assertClipboardContent(content: string) {
		const clipboardContent = await this.page.evaluate(() => navigator.clipboard.readText());
		expect(clipboardContent).toContain(content);
	}

	public async getSecondaryFormatterSection(formatter: string) {
		return this.page.getByTestId(testIds.optionSectionPrefix + formatter);
	}

	public async seesSecondaryFormattersHeading() {
		await expect(this.secondaryFormattersHeading).toBeVisible();
	}

	public async seesSecondaryFormatter(formatter: string) {
		const section = await this.getSecondaryFormatterSection(formatter);
		await expect(section).toBeVisible();
		await expect(section.getByRole("heading", { level: 3, exact: true })).toHaveText(formatter);
		await expect(section.getByText(this.dictionary.browserSupport)).toBeVisible();
	}

	public async seesSecondaryFormatterContent(formatter: string, content: string) {
		const section = await this.getSecondaryFormatterSection(formatter);
		await expect(section.getByRole("code")).toHaveText(content);
	}

	public async invalidOptionsForDateStyleAreVisible(visible: boolean) {
		invalidOptions.forEach((option) => {
			const locator = this.page.getByRole("checkbox", { name: `${option} active`, exact: true });
			if (visible) {
				expect(locator).toBeVisible();
			} else {
				expect(locator).not.toBeVisible();
			}
		});
	}
}
