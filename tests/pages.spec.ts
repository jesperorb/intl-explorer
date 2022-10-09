import { expect, test, type Page } from '@playwright/test';
import { checkA11y, injectAxe } from 'axe-playwright';

export const getTabKey = (browserName: string) => {
	return browserName === 'webkit' ? 'Alt+Tab' : 'Tab';
};

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
		this.baseURL = baseURL ?? 'http://localhost:4173';
		this.pageUnderTest = '';
	}

	public setPageUnderTest(pageUnderTest: string) {
		this.pageUnderTest = pageUnderTest;
	}

	private getMDNLinkLocator(method: string): string {
		return `a[href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/${method}"]`;
	}

	private getMDNLinkText(method: string): string {
		return `MDN Link for Intl.${method}`;
	}

	private getUrl(method: string, locale?: string): string {
		return `${this.baseURL}/${method}?locale=${locale ?? 'en-US'}`;
	}

	public async goToPage() {
		await this.page.goto('/');
		await this.page
			.locator(`[data-testid="navigation"] a:has-text("${this.pageUnderTest}")`)
			.click();
		await expect(this.page).toHaveURL(this.getUrl(this.pageUnderTest));
	}

	public async assertTitle() {
		expect(await this.page.textContent('h1')).toBe(`Intl.${this.pageUnderTest}`);
	}

	public async assertMDNLink() {
		expect(await this.page.textContent('h1')).toBe(`Intl.${this.pageUnderTest}`);
		expect(await this.page.textContent(this.getMDNLinkLocator(this.pageUnderTest))).toBe(
			this.getMDNLinkText(this.pageUnderTest)
		);
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
		await this.page.locator('select[name="locale"]').nth(0).selectOption(locale);
	}

	public async assertUrlLocale(locale: string) {
		await expect(this.page).toHaveURL(this.getUrl(this.pageUnderTest, locale));
	}

	async tabAndAssertElementHasFocus(selector: string, nth = 0) {
		await this.page.keyboard.press(this.tabKey);
		await expect(this.page.locator(selector).nth(nth)).toBeFocused();
	}

	public async runAxe() {
		await injectAxe(this.page);
		await checkA11y(this.page, undefined, {
			axeOptions: {},
			detailedReport: true,
			detailedReportOptions: { html: true }
		});
	}
}

test('index page has expected heading', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe('Welcome to Intl Explorer! 👋🏽');
	await injectAxe(page);
	await checkA11y(page, undefined, {
		axeOptions: {},
		detailedReport: true,
		detailedReportOptions: { html: true }
	});
});

test('DateTimeFormat', async ({ page, browserName, baseURL }, { title }) => {
	const intlPage = new IntlPage({
		page,
		tabKey: getTabKey(browserName),
		baseURL
	});
	intlPage.setPageUnderTest(title);
	await intlPage.goToPage();
	await intlPage.assertTitle();
	await intlPage.assertMDNLink();
	await intlPage.assertCodeBlockContent(
		'dateStyle',
		`{ dateStyle: "full" }\n// Sunday, April 4, 2004`
	);
	await intlPage.selectLocale('sv');
	await intlPage.assertUrlLocale('sv');
	await intlPage.assertCodeBlockContent(
		'dateStyle',
		`{ dateStyle: "full" }\n// söndag 4 april 2004`
	);
	await page.locator('input[type="datetime-local"]').click();
	await page.locator('input[type="datetime-local"]').fill('2022-04-04T04:04:04');
	await intlPage.assertCodeBlockContent(
		'dateStyle',
		`{ dateStyle: "full" }\n// måndag 4 april 2022`
	);
	await intlPage.runAxe();
});

test('RelativeTimeFormat', async ({ page, browserName, baseURL }, { title }) => {
	const intlPage = new IntlPage({
		page,
		tabKey: getTabKey(browserName),
		baseURL
	});
	intlPage.setPageUnderTest(title);
	await intlPage.goToPage();
	await intlPage.assertTitle();
	await intlPage.assertMDNLink();
	await intlPage.assertCodeBlockContent(
		'unit',
		`{ value: "year", style: "long", numeric: "auto", }\n// in 2 years`
	);
	await intlPage.selectLocale('sv');
	await intlPage.assertUrlLocale('sv');
	await intlPage.assertCodeBlockContent(
		'unit',
		`{ value: "year", style: "long", numeric: "auto", }\n// om 2 år`
	);
	await intlPage.page.locator('input[type="text"]').fill('10');
	await intlPage.assertCodeBlockContent(
		'unit',
		`{ value: "year", style: "long", numeric: "auto", }\n// om 10 år`
	);
	await page.locator('#styleNarrow').check();
	await intlPage.assertCodeBlockContent(
		'unit',
		`{ value: "year", style: "narrow", numeric: "auto", }\n// +10 år`
	);
	await intlPage.page.locator('input[type="text"]').fill('1');
	await page.locator('#numericAlways').check();
	await intlPage.assertCodeBlockContent(
		'unit',
		`{ value: "year", style: "narrow", numeric: "always", }\n// +1 år`
	);
	await intlPage.runAxe();
});

test('ListFormat', async ({ page, browserName, baseURL }, { title }) => {
	const intlPage = new IntlPage({
		page,
		tabKey: getTabKey(browserName),
		baseURL
	});
	intlPage.setPageUnderTest(title);
	await intlPage.goToPage();
	await intlPage.assertTitle();
	await intlPage.assertMDNLink();
	await intlPage.assertCodeBlockContent(
		'type',
		`{ type: "conjunction" }\n// Miso, Sesam, and Mami`
	);
	await intlPage.selectLocale('sv');
	await intlPage.assertUrlLocale('sv');
	await intlPage.assertCodeBlockContent('type', `{ type: "conjunction" }\n// Miso, Sesam och Mami`);
	await page.locator('input[type="text"]').fill('Miso,Sesam');
	await intlPage.assertCodeBlockContent('type', `{ type: "conjunction" }\n// Miso och Sesam`);
	await intlPage.runAxe();
});

test('PluralRules', async ({ page, browserName, baseURL }, { title }) => {
	const intlPage = new IntlPage({
		page,
		tabKey: getTabKey(browserName),
		baseURL
	});
	intlPage.setPageUnderTest(title);
	await intlPage.goToPage();
	await intlPage.assertTitle();
	await intlPage.assertMDNLink();
	await intlPage.assertCodeBlockContent('cardinal', `{ value: 1, type: "cardinal", }\n// one`);
	await intlPage.selectLocale('sv');
	await intlPage.assertUrlLocale('sv');
	await intlPage.assertCodeBlockContent('cardinal', `{ value: 1, type: "cardinal", }\n// one`);
	await page.locator('#typeOrdinal').check();
	await intlPage.assertCodeBlockContent('ordinal', `{ value: 1, type: "ordinal", }\n// one`);
	await intlPage.runAxe();
});

test('Playground', async ({ page, browserName, baseURL }, { title }) => {
	const intlPage = new IntlPage({
		page,
		tabKey: getTabKey(browserName),
		baseURL
	});
	intlPage.setPageUnderTest(title);
	await intlPage.page.goto('/Playground');
	expect(await page.textContent('h1')).toBe('Playground');
	expect(await page.locator('#methodSelect').inputValue()).toEqual('ListFormat');
	expect(await page.locator('#inputValue').inputValue()).toEqual('cat,hat,rat');
	expect(await page.locator('#typeSelect').inputValue()).toEqual('');
	expect(await page.locator('#styleSelect').inputValue()).toEqual('');
	expect(await page.locator('#output code').textContent()).toEqual('cat, hat, and rat');
	expect(await page.locator('#code code').textContent()).toEqual(
		`new Intl.ListFormat("en-US").format(["cat","hat","rat"])\n`
	);
	await intlPage.runAxe();
});
