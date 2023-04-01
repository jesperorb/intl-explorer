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
		return this.page.locator(`[data-testid="option-section-${title}"] code`).first();
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
}

test('index page has expected heading', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe('Welcome to Intl Explorer! 👋🏽');
	await page.waitForTimeout(300);
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
		`{  dateStyle: "full"   } // Sunday, April 24, 2022`
	);
	await intlPage.selectLocale('sv');
	await intlPage.assertUrlLocale('sv');
	await intlPage.assertCodeBlockContent(
		'dateStyle',
		`{  dateStyle: "full"   } // söndag 24 april 2022`
	);
	await page.locator('input[type="date"]').click();
	await page.locator('input[type="date"]').fill('2022-04-04');
	await intlPage.assertCodeBlockContent(
		'dateStyle',
		`{  dateStyle: "full"   } // måndag 4 april 2022`
	);
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
		`{  value: "year" , style: "long" , numeric: "auto"   } // in 2 years`
	);
	await intlPage.selectLocale('sv');
	await intlPage.assertUrlLocale('sv');
	await intlPage.assertCodeBlockContent(
		'unit',
		`{  value: "year" , style: "long" , numeric: "auto"   } // om 2 år`
	);
	await intlPage.page.locator('input[type="text"]').fill('10');
	await intlPage.assertCodeBlockContent(
		'unit',
		`{  value: "year" , style: "long" , numeric: "auto"   } // om 10 år`
	);
	await page.locator('#styleNarrow').check();
	await intlPage.assertCodeBlockContent(
		'unit',
		`{  value: "year" , style: "narrow" , numeric: "auto"   } // +10 år`
	);
	await intlPage.page.locator('input[type="text"]').fill('1');
	await page.locator('#numericAlways').check();
	await intlPage.assertCodeBlockContent(
		'unit',
		`{  value: "year" , style: "narrow" , numeric: "always"   } // +1 år`
	);
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
		`{  type: "conjunction"   } // Miso, Sesam, and Mami`
	);
	await intlPage.selectLocale('sv');
	await intlPage.assertUrlLocale('sv');
	await intlPage.assertCodeBlockContent('type', `{  type: "conjunction"   } // Miso, Sesam och Mami`);
	await page.locator('input[type="text"]').fill('Miso,Sesam');
	await intlPage.assertCodeBlockContent('type', `{  type: "conjunction"   } // Miso och Sesam`);
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
	await intlPage.assertCodeBlockContent('cardinal', `{  value: 1 , type: "cardinal"   } // one`);
	await intlPage.selectLocale('sv');
	await intlPage.assertUrlLocale('sv');
	await intlPage.assertCodeBlockContent('cardinal', `{  value: 1 , type: "cardinal"   } // one`);
	await page.locator('#typeOrdinal').check();
	await intlPage.assertCodeBlockContent('ordinal', `{  value: 1 , type: "ordinal"   } // one`);
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
});

test('a11y', async ({ page, browserName }) => {
	test.skip(browserName === 'firefox' || browserName === 'webkit', 'Only run in Chrome');
	const options = {
		axeOptions: {},
		detailedReport: true,
		detailedReportOptions: { html: true }
	};
	await page.goto('/');
	await page.waitForTimeout(300);
	await injectAxe(page);
	await test.step('DateTimeFormat why no work', async () => {
		test.skip();
		await page.locator(`[data-testid="navigation"] a:has-text("DateTimeFormat")`).click();
		await page.waitForNavigation({ url: '**/DateTimeFormat' }),
			await checkA11y(page, undefined, options);
	});
	await test.step('RelativeTimeFormat', async () => {
		await page.locator(`[data-testid="navigation"] a:has-text("RelativeTimeFormat")`).click();
		await page.waitForNavigation({ url: '**/RelativeTimeFormat' }),
			await checkA11y(page, undefined, options);
	});
	await test.step('NumberFormat/Currency', async () => {
		await page.locator(`[data-testid="navigation"] a:has-text("NumberFormat/Currency")`).click();
		await page.waitForNavigation({ url: '**/NumberFormat/Currency' }),
			await checkA11y(page, undefined, options);
	});
	await test.step('NumberFormat/Unit', async () => {
		await page.locator(`[data-testid="navigation"] a:has-text("NumberFormat/Unit")`).click();
		await page.waitForNavigation({ url: '**/NumberFormat/Unit' }),
			await checkA11y(page, undefined, options);
	});
	await test.step('ListFormat', async () => {
		await page.locator(`[data-testid="navigation"] a:has-text("ListFormat")`).click();
		await page.waitForNavigation({ url: '**/ListFormat' }),
			await checkA11y(page, undefined, options);
	});
	await test.step('PluralRules', async () => {
		await page.locator(`[data-testid="navigation"] a:has-text("PluralRules")`).click();
		await page.waitForNavigation({ url: '**/PluralRules' }),
			await checkA11y(page, undefined, options);
	});
	await test.step('Collator', async () => {
		await page.locator(`[data-testid="navigation"] a:has-text("Collator")`).click();
		await page.waitForNavigation({ url: '**/Collator' }), await checkA11y(page, undefined, options);
	});
	await test.step('Segmenter', async () => {
		await page.locator(`[data-testid="navigation"] a:has-text("Segmenter")`).click();
		await page.waitForNavigation({ url: '**/Segmenter' }),
			await checkA11y(page, undefined, options);
	});
	await test.step('Playground', async () => {
		await page.locator(`[data-testid="navigation"] a:has-text("Playground")`).click();
		await page.waitForNavigation({ url: '**/Playground' }),
			await checkA11y(page, undefined, options);
	});
});
