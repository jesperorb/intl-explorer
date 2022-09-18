import { expect, test } from "@playwright/test";

import type { Page } from "@playwright/test";

type IntlPageConfig = {
	page: Page;
	tabKey?: string;
};

export class IntlPage {
	readonly page: Page;
	readonly tabKey: string;
	private pageUnderTest: string;

	constructor({ page, tabKey = "Tab" }: IntlPageConfig) {
		this.page = page;
		this.tabKey = tabKey;
		this.pageUnderTest = "";
	}

	public setPageUnderTest(pageUnderTest: string) {
		this.pageUnderTest = pageUnderTest;
	}

	private getMDNLinkLocator(method: string): string {
		return `a[href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/${method}"]`
	}

	private getMDNLinkText(method: string): string {
		return `MDN Link for Intl.${method}`;
	}

	private getUrl(method: string, locale?: string): string {
		return `http://localhost:4173/${method}?locale=${locale ?? "en-US"}`
	}

	public async goToPage() {
		await this.page.goto('/');
		await this.page.locator(`ul >> text=${this.pageUnderTest}`).click();
		await expect(this.page).toHaveURL(this.getUrl(this.pageUnderTest));
	}

	public async assertTitle() {
		expect(await this.page.textContent('h1')).toBe(`Intl.${this.pageUnderTest}`);
	}

	public async assertMDNLink() {
		expect(await this.page.textContent('h1')).toBe(`Intl.${this.pageUnderTest}`);
		expect(
			await this.page.textContent(
			this.getMDNLinkLocator(this.pageUnderTest)
		)
		).toBe(this.getMDNLinkText(this.pageUnderTest))
	}

	public async getCodeBlockByTitle(title: string) {
		return this.page.locator(`[data-testid="option-section-${title}"] pre`).first();
	}

	public async assertCodeBlockContent(title: string, content: string) {
		const codeBlock = await this.getCodeBlockByTitle(title);
		const newText = await codeBlock.textContent();
		expect(newText).toBe(content);
	}

	public async selectLocale(locale: string) {
		await this.page.locator('select[name="locale"]').selectOption(locale);
	}

	public async assertUrlLocale(locale: string) {
		await expect(this.page).toHaveURL(this.getUrl(this.pageUnderTest, locale));
	}

	async tabAndAssertElementHasFocus(selector: string, nth = 0) {
		await this.page.keyboard.press(this.tabKey);
		await expect(this.page.locator(selector).nth(nth)).toBeFocused();
	}
}


test('index page has expected heading', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe('Welcome to Intl Explorer! 👋🏽');
});

test('DateTimeFormat', async ({ page, browserName }, { title}) => {
	const getTabKey = (browserName: string) => {
		return browserName === "webkit" ? "Alt+Tab" : "Tab";
	};
	const intlPage = new IntlPage({
		page,
		tabKey: getTabKey(browserName),
	});
	intlPage.setPageUnderTest(title);
	await intlPage.goToPage();
  await intlPage.assertTitle();
	await intlPage.assertMDNLink();
	await intlPage.assertCodeBlockContent(
		"dateStyle",
		`{ dateStyle: "full" }\n// Sunday, April 4, 2004`
	)
	await intlPage.selectLocale("sv");
  await intlPage.assertUrlLocale("sv");
	await intlPage.assertCodeBlockContent(
		"dateStyle",
		`{ dateStyle: "full" }\n// söndag 4 april 2004`
	)
	await intlPage.page.reload()
  await intlPage.assertUrlLocale("sv");
});
