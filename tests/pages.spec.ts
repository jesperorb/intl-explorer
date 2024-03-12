import { formatMethods } from '../src/lib/format-methods';
import { test } from './test';

test.describe("Pages", () => {
	formatMethods.forEach(method => {
		test(method, async ({ intlPage }) => {
			await test.step("Setup", async () => {
				intlPage.setPageUnderTest(method);
				await intlPage.goToPage();
			})
			await test.step("Check a11y", async () => {
				await intlPage.checkAlly();
			})
		})
	})
})

test("Playground", async ({ intlPage }) => {
	await test.step("Setup", async () => {
		intlPage.setPageUnderTest("Playground");
		await intlPage.clickOnNavigationLink();
		await intlPage.page.waitForURL("**/Playground?locale=en-US")
	})
	await test.step("Check a11y", async () => {
		await intlPage.checkAlly();
	})
})
