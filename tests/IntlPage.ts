import { expect, type Locator, type Page } from "@playwright/test";
import { defaultPageUnderTest, localBaseURL, mdnUrl } from "./constants";
import { checkA11y } from "axe-playwright";
import { testIds } from "../src/lib/utils/dom-utils";
import messages from "../messages/en.json" assert { type: "json" };

export type IntlPageConfig = {
	page: Page;
	tabKey?: string;
	baseURL?: string;
};

export class IntlPage {
	private readonly tabKey: string;
	private readonly baseURL: string;
	private pageUnderTest: string;
	public page: Page;

	private playground: {
		code: Locator;
		output: Locator;
		method: Locator;
		value: Locator;
		locale: Locator;
	}

	private locale: Locator;

	constructor({ page, tabKey = "Tab", baseURL }: IntlPageConfig) {
		this.page = page;
		this.tabKey = tabKey;
		this.baseURL = baseURL ?? localBaseURL;
		this.pageUnderTest = defaultPageUnderTest;
		this.locale = this.page.getByPlaceholder(messages.localePlaceHolder);
		this.playground = {
			code: this.page.getByTestId(testIds.playground.code),
			output: this.page.getByTestId(testIds.playground.output),
			method: this.page.getByLabel(messages.method),
			value: this.page.getByLabel(messages.value),
			locale: this.page.getByPlaceholder(messages.localePlaceHolder)
		}
	}

	public setPageUnderTest(pageUnderTest: string) {
		this.pageUnderTest = pageUnderTest;
	}

	private getMDNLinkLocator(method: string): string {
		return `a[href="${mdnUrl}/${method}"]`;
	}

	private getMDNLinkText(): string {
		return `MDN`;
	}

	private getUrl(method: string, locale?: string): string {
		const withLocale = locale ? `?locale=${locale ?? "en-US"}` : "";
		return `${this.baseURL}/${method}${withLocale}`;
	}

	public async goToHome() {
		await this.page.goto(this.baseURL);
		await expect(
			this.page.getByRole("heading", { level: 1, name: messages.blurbWelcome })
		).toBeVisible();
	}

	public async clickOnMenu() {
		await this.page.getByTestId(testIds.openNavigation).click();
		await expect(this.page.getByRole("button", { name: messages.close })).toBeVisible();
	}

	public async clickOnNavigationLink() {
		await this.clickOnMenu();
		await this.page.getByTestId(testIds.navigation)
			.getByRole('link', { name: this.pageUnderTest, exact: true })
			.click();
	}

	public async goToPage() {
		await this.clickOnNavigationLink();
		await expect(this.page).toHaveURL(this.getUrl(this.pageUnderTest));
	}

	public async assertTitle(prefix = true) {
		expect(await this.page.textContent("h1")).toBe(`${prefix ? "Intl." : ""}${this.pageUnderTest} `);
	}

	public async assertMDNLink() {
		expect(await this.page.textContent(this.getMDNLinkLocator(this.pageUnderTest))).toBe(
			this.getMDNLinkText()
		);
	}

	public async assertUrlLocale(locale: string) {
		await expect(this.page).toHaveURL(this.getUrl(this.pageUnderTest, locale));
	}

	public async changeLocale(locale: string) {
		await this.locale.focus();
		await this.page.keyboard.type(locale);
		await this.page.keyboard.down("ArrowDown");
		await this.page.keyboard.down("Enter");
		await this.page.keyboard.down("Escape");
	}

	public async assertLocaleChip(locale: string) {
		await expect(this.page.getByLabel(messages.remove.replace("{value}", locale))).toBeVisible();
	}

	public async tabAndAssertElementHasFocus(selector: string, nth = 0) {
		await this.page.keyboard.press(this.tabKey);
		await expect(this.page.locator(selector).nth(nth)).toBeFocused();
	}

	public async checkAlly() {
		await checkA11y(this.page, undefined, {
			axeOptions: {},
			detailedReport: true,
			detailedReportOptions: { html: true }
		});
	}

	public async verifyPlaygroundDefaultValues() {
		await expect(this.playground.value).toHaveValue("1091");
		await expect(this.playground.method).toHaveValue("NumberFormat");
		await expect(this.playground.locale).toHaveValue("");
		await expect(this.playground.output).toHaveText("$1,091.00")
		await expect(this.playground.code).toContainText('"style": "currency"')
		await expect(this.playground.code).toContainText('"currency": "USD"')
	}
}
