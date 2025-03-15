import { expect, type Locator, type Page } from "@playwright/test";
import { defaultPageUnderTest, localBaseURL, mdnUrl } from "../constants";
import { testIds } from "../../src/lib/utils/dom-utils";
import enMessages from "../../messages/en.json" assert { type: "json" };
import svMessages from "../../messages/sv.json" assert { type: "json" };

export type BasePageConfig = {
	page: Page;
	tabKey?: string;
	baseURL?: string;
	language?: "en" | "sv";
};

export class BasePage {
	public page: Page;

	protected readonly tabKey: string;

	protected readonly baseURL: string;

	protected pageUnderTest: string;

	protected locale: Locator;

	protected dictionary: typeof enMessages | typeof svMessages;

	constructor({ page, tabKey = "Tab", baseURL, language = "en" }: BasePageConfig) {
		this.page = page;
		this.tabKey = tabKey;
		this.baseURL = baseURL ?? localBaseURL;
		this.pageUnderTest = defaultPageUnderTest;
		this.dictionary = language === "en" ? enMessages : svMessages;
		this.locale = this.page.getByPlaceholder(this.dictionary.localePlaceHolder);
	}

	public changeDictionaryLanguage(language: BasePageConfig["language"]) {
		this.dictionary = language === "en" ? enMessages : svMessages;
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

	public async goesToStart() {
		await this.page.goto(this.baseURL);
		await expect(
			this.page.getByRole("heading", { level: 1, name: this.dictionary.blurbWelcome })
		).toBeVisible();
	}

	public async clicksOnMenu() {
		await this.page.waitForLoadState('networkidle');
		await this.page.getByTestId(testIds.openNavigation).waitFor();
		await this.page.getByTestId(testIds.openNavigation).click();
		await expect(this.page.getByRole("button", { name: this.dictionary.close })).toBeVisible();
	}

	public async clicksOnNavigationLink() {
		await this.clicksOnMenu();
		await this.page
			.getByTestId(testIds.navigation)
			.getByRole("link", { name: this.pageUnderTest, exact: true })
			.click();
	}

	public async goesToPage() {
		await this.clicksOnNavigationLink();
		await expect(this.page).toHaveURL(this.getUrl(this.pageUnderTest));
	}

	public async assertTitle(prefix = true) {
		expect(await this.page.textContent("h1")).toBe(
			`${prefix ? "Intl." : ""}${this.pageUnderTest} `
		);
	}

	public async assertMDNLink() {
		expect(await this.page.textContent(this.getMDNLinkLocator(this.pageUnderTest))).toBe(
			this.getMDNLinkText()
		);
	}

	public async assertUrlLocale(locale: string) {
		await expect(this.page).toHaveURL(this.getUrl(this.pageUnderTest, locale));
	}

	public async changesLocale(locale: string) {
		await this.locale.focus();
		await this.page.keyboard.type(locale);
		await this.page.keyboard.down("ArrowDown");
		await this.page.keyboard.down("Enter");
		await this.page.keyboard.down("Escape");
	}

	public async seesSelectedLocaleChip(locale: string) {
		await expect(
			this.page.getByLabel(this.dictionary.remove.replace("{value}", locale))
		).toBeVisible();
	}

	public async tabAndAssertElementHasFocus(selector: string, nth = 0) {
		await this.page.keyboard.press(this.tabKey);
		await expect(this.page.locator(selector).nth(nth)).toBeFocused();
	}

	public async sleep(ms: number) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}
}
