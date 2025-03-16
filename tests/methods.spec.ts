import { formatMethods } from "../src/lib/format-methods";
import { test } from "./test";

test("visits and sees all method pages", async ({ intlPage }) => {
	await test.step("goes to page", async () => {
		await intlPage.goesToStart();
	});
	for (const method of formatMethods) {
		await test.step("goes to page", async () => {
			intlPage.setPageUnderTest(method);
			await intlPage.goesToPage();
		});

		await test.step("verifies default values", async () => {
			await intlPage.assertMDNLink();
			await intlPage.assertTitle();
		});

		await test.step("changes input value and checks result", async () => {
			await intlPage.changesValueAndSeesExpectedOutput(method);
		});
	}

	await test.step("changes locale and sees locale change", async () => {
		const locale = "sv-SE";
		await intlPage.changesLocale(locale);
		await intlPage.assertUrlLocale(locale);
		await intlPage.seesSelectedLocaleChip(locale);
	});
});
