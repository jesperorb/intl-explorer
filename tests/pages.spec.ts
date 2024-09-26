import { formatMethods } from "../src/lib/format-methods";
import { test } from "./test";

test.describe("Pages", () => {
	formatMethods.forEach((method) => {
		test(method, async ({ intlPage }) => {
			const locale = "sv-SE";
			await test.step("Setup", async () => {
				intlPage.setPageUnderTest(method);
				await intlPage.goToPage();
			});
			await test.step("Check accessibility", async () => {
				await intlPage.checkAlly();
			});

			await test.step("Verify default values", async () => {
				await intlPage.assertMDNLink();
				await intlPage.assertTitle();
			});

			await test.step("Change locale", async () => {
				await intlPage.changeLocale(locale);
				await intlPage.assertUrlLocale(locale);
				await intlPage.assertLocaleChip(locale);
			});
		});
	});
});

test("Playground", async ({ intlPage }) => {
	await test.step("Setup", async () => {
		intlPage.setPageUnderTest("Playground");
		await intlPage.clickOnNavigationLink();
		await intlPage.page.waitForURL("**/Playground");
	});

	await test.step("Check a11y", async () => {
		await intlPage.checkAlly();
	});

	await test.step("Verify default values", async () => {
		await intlPage.verifyPlaygroundDefaultValues();
	});
});
