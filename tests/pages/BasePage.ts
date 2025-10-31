import { expect, type Locator, type Page } from "@playwright/test";
import { defaultPageUnderTest, localBaseURL, mdnUrl } from "../constants";
import { testIds } from "../../src/lib/utils/dom-utils";
import enMessages from "../../messages/en.json" with { type: "json" };
import svMessages from "../../messages/sv.json" with { type: "json" };

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

	protected translations: {
		en: typeof enMessages;
		sv: typeof svMessages;
	};

	constructor({ page, tabKey = "Tab", baseURL, language = "en" }: BasePageConfig) {
		this.page = page;
		this.tabKey = tabKey;
		this.baseURL = baseURL ?? localBaseURL;
		this.pageUnderTest = defaultPageUnderTest;
		this.translations = {
			en: enMessages,
			sv: svMessages
		};
		this.dictionary = this.translations[language];
		this.locale = this.page.getByPlaceholder(this.dictionary.localePlaceHolder);
	}

	public changeDictionaryLanguage(language: NonNullable<BasePageConfig["language"]>) {
		this.dictionary = this.translations[language];
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

	private getUrl({
		method,
		locale,
		language
	}: {
		method: string;
		locale?: string;
		language?: string;
	}): string {
		const withLocale = locale ? `?locale=${locale ?? "en-US"}` : "";
		const withLanguage = language ? `/${language}` : "/";
		const withMethod = method === "/" ? "" : method;
		return `${this.baseURL}${withLanguage}${withMethod}${withLocale}`;
	}

	public async goesToStart() {
		await this.page.goto(this.baseURL);
		await expect(
			this.page.getByRole("heading", { level: 1, name: this.dictionary.blurbWelcome })
		).toBeVisible();
	}

	public async clicksOnMenu() {
		await this.page.waitForLoadState("networkidle");
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
		await this.page.waitForURL(this.getUrl({ method: this.pageUnderTest }));
		await expect(this.page).toHaveURL(this.getUrl({ method: this.pageUnderTest }));
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
		await expect(this.page).toHaveURL(this.getUrl({ method: this.pageUnderTest, locale }));
	}

	public async assertUrlLanguage(language: string) {
		await this.page.waitForURL(`**/${language}`);
		await expect(this.page).toHaveURL(this.getUrl({ method: this.pageUnderTest, language }));
	}

	public async assertHtmlLanguage(language: string) {
		await expect(this.page.locator("html")).toHaveAttribute("lang", language);
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

	public async removedSelectedLocale(locale: string) {
		await this.locale.focus();
		await this.locale.clear({ force: true });
		await this.page.keyboard.down("Escape");
		await this.page.getByLabel(this.dictionary.remove.replace("{value}", locale)).click();
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

	public async dragElement({
		element,
		xOffset,
		yOffset
	}: {
		element: Locator;
		xOffset: number;
		yOffset: number;
	}) {
		const elementBox = await element.boundingBox();
		if (!elementBox) {
			throw new Error("Unable to find bounding box on element");
		}

		const elementCenterX = elementBox.x + elementBox.width / 2;
		const elementCenterY = elementBox.y + elementBox.height / 2;

		await element.hover();
		await this.page.mouse.down();
		await this.page.mouse.move(elementCenterX + xOffset, elementCenterY + yOffset);
		await this.page.mouse.up();
	}
}
