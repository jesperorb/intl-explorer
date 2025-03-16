import { test } from "./test";

test("user changes settings", async ({ settings, playground }) => {
	await test.step("user navigates to settings page", async () => {
		await settings.goesToStart();
		await settings.open();
	});

	await test.step("user selects dark theme mode", async () => {
		await settings.seesThemeMode("light");
		await settings.selectsThemeMode("dark");
		await settings.seesThemeMode("dark");
	});

	await test.step("user selects dark code theme mode", async () => {
		await settings.seesCodeThemeMode("dark");
		await settings.selectsCodeThemeMode("light");
		await settings.seesCodeThemeMode("light");
	});

	await test.step("user hides browser support", async () => {
		const formatter: keyof Intl.NumberFormat = "formatToParts";
		await settings.close();
		await playground.goesToPage();
		await playground.seesBrowserSupport(true);
		await playground.seesBrowserSupportForSecondaryFormatter(formatter, true);
		await settings.open();
		await settings.togglesBrowserSupport(false);
		await settings.close();
		await playground.seesBrowserSupport(false);
		await playground.seesBrowserSupportForSecondaryFormatter(formatter, false);
	});

	await test.step("user changes language", async () => {
		await settings.goesToStart();
		await settings.open();
		await settings.selectsLanguage("sv");
		await settings.assertUrlLanguage("sv");
		await settings.assertHtmlLanguage("sv");
		settings.changeDictionaryLanguage("sv");
		await settings.open();
		await settings.seesHeadingForLanguage("sv");
	});

	await test.step("user changes accent color", async () => {
		await settings.seesDefaultAccentColor();
		await settings.changesAccentColor(-100);
		await settings.doesNotSeeDefaultAccentColor();
	});
});
