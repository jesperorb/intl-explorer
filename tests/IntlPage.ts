import { expect, type Page } from '@playwright/test';
import { defaultPageUnderTest, localBaseURL, mdnUrl } from './contstants';
import { checkA11y } from 'axe-playwright';
import { testIds } from '../src/lib/utils/dom-utils';

export type IntlPageConfig = {
	page: Page;
	tabKey?: string;
	baseURL?: string;
};

// This is here because for some weird reason playwright cant import from other files :shrug:
export class IntlPage {
	private readonly tabKey: string;
	private readonly baseURL: string;
	private pageUnderTest: string;
	public page: Page;

	constructor({ page, tabKey = 'Tab', baseURL }: IntlPageConfig) {
		this.page = page;
		this.tabKey = tabKey;
		this.baseURL = baseURL ?? localBaseURL;
		this.pageUnderTest = defaultPageUnderTest;
	}

	public setPageUnderTest(pageUnderTest: string) {
		this.pageUnderTest = pageUnderTest;
	}

	private getMDNLinkLocator(method: string): string {
		return `a[href="${mdnUrl}/${method}"]`;
	}

	private getMDNLinkText(method: string): string {
		return `MDN Link for Intl.${method}`;
	}

	private getUrl(method: string, locale?: string): string {
		return `${this.baseURL}/${method}?locale=${locale ?? 'en-US'}`;
	}

	public async goToHome(){
		await this.page.goto(this.baseURL);
	}

	public async clickOnNavigationLink() {
		await this.page
			.locator(`[data-testid="${testIds.navigation}"] a:has-text("${this.pageUnderTest}")`)
			.click();
	}

	public async goToPage() {
		await this.clickOnNavigationLink();
		await expect(this.page).toHaveURL(this.getUrl(this.pageUnderTest));
	}

	public async assertTitle(prefix = true) {
		expect(await this.page.textContent('h1')).toBe(`${prefix ? "Intl." : ""}${this.pageUnderTest}`);
	}

	public async assertMDNLink() {
		expect(await this.page.textContent('h1')).toBe(`Intl.${this.pageUnderTest}`);
		expect(await this.page.textContent(this.getMDNLinkLocator(this.pageUnderTest))).toBe(
			this.getMDNLinkText(this.pageUnderTest)
		);
	}

	public async selectLocale(locale: string) {
		await this.page.locator('select[name="locale"]').nth(0).selectOption(locale);
	}

	public async assertUrlLocale(locale: string) {
		await expect(this.page).toHaveURL(this.getUrl(this.pageUnderTest, locale));
	}

	async tabAndAssertElementHasFocus(selector: string, nth = 0) {
		await this.page.keyboard.press(this.tabKey);
		await expect(this.page.locator(selector).nth(nth)).toBeFocused();
	}

	async checkAlly() {
		await checkA11y(this.page, undefined, {
			axeOptions: {},
			detailedReport: true,
			detailedReportOptions: { html: true }
		});
	}
}