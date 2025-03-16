import { test } from "./test";

test("user changes playground options and sees generated output", async ({ playground }) => {
	await test.step("goes to playground page", async () => {
		await playground.goesToStart();
		await playground.goesToPage();
		await playground.page.waitForURL("**/Playground");
	});

	await test.step("changes method", async () => {
		await playground.selectsMethod("ListFormat");
		await playground.seesInputValue("cat,hat,rat");
		await playground.seesOutput("cat, hat, and rat");
		await playground.seesCode(`new Intl.ListFormat(undefined).format(["cat","hat","rat"])`);
	});

	await test.step("changes value", async () => {
		await playground.changesInputValue("cat,hat", true);
		await playground.seesInputValue("cat,hat");
		await playground.seesOutput("cat and hat");
		await playground.seesCode(`new Intl.ListFormat(undefined).format(["cat","hat"])`);
		await playground.seesResolvedOptions(`{
			"locale": "en-US",
			"type": "conjunction",
			"style": "long"
		}`);
	});

	await test.step("adds locale", async () => {
		const locale = "sv-SE";
		await playground.changesLocale(locale);
		await playground.seesSelectedLocaleChip(locale);
		await playground.seesOutput("cat och hat");
		await playground.seesCode(`new Intl.ListFormat("${locale}").format(["cat","hat"])`);
		await playground.seesResolvedOptions(`{
			"locale": "sv-SE",
			"type": "conjunction",
			"style": "long"
		}`);
	});

	await test.step("changes format options", async () => {
		const type: keyof Intl.ListFormatOptions = "type";
		const option: Intl.ListFormatType = "disjunction";
		await playground.changesOption(type, option);
		await playground.seesOutput("cat eller hat");
		await playground.seesCode(`new Intl.ListFormat("sv-SE",
			{
				"type": "${option}"
			})
			.format(["cat","hat"])`);

		await playground.seesResolvedOptions(`{
			"locale": "sv-SE",
			"type": "${option}",
			"style": "long"
		}`);
		await playground.unchecksOption(type);
		await playground.seesOutput("cat och hat");
		await playground.seesCode(`new Intl.ListFormat("sv-SE").format(["cat","hat"])`);
		await playground.seesResolvedOptions(`{
			"locale": "sv-SE",
			"type": "conjunction",
			"style": "long"
		}`);
	});

	await test.step("sees secondary formatter output", async () => {
		const formatter: keyof Intl.ListFormat = "formatToParts";
		const type: keyof Intl.ListFormatOptions = "type";
		await playground.seesSecondaryFormatter(formatter);
		await playground.seesSecondaryFormatterContent(
			formatter,
			`[
			{
				"type": "element",
				"value": "cat"
			},
			{
				"type": "literal",
				"value": " och "
			},
			{
				"type": "element",
				"value": "hat"
			}
		]`
		);
		await playground.checksOption(type);
		await playground.seesSecondaryFormatterContent(
			formatter,
			`[
			{
				"type": "element",
				"value": "cat"
			},
			{
				"type": "literal",
				"value": " eller "
			},
			{
				"type": "element",
				"value": "hat"
			}
		]`
		);
	});
});

test("user changes playground options for DateTimeFormat", async ({ playground }) => {
	await test.step("goes to playground page", async () => {
		await playground.goesToStart();
		await playground.goesToPage();
		await playground.page.waitForURL("**/Playground");
	});

	await test.step("selects DateTimeFormat and sees default values", async () => {
		await playground.selectsMethod("DateTimeFormat");
		await playground.seesDateInputValue("2022-04-24");
		await playground.seesTimeInputValue("19:00");
		await playground.seesOutput("4/24/2022");
		await playground.seesCode(`new Intl.DateTimeFormat(undefined).format("2022-04-24T19:00")`);
	});

	await test.step("hides invalid option when dateStyle is selected", async () => {
		const type: keyof Intl.DateTimeFormatOptions = "dateStyle";
		const option: Intl.DateTimeFormatOptions["dateStyle"] = "short";
		await playground.changesOption(type, option);
		await playground.invalidOptionsForDateStyleAreVisible(false);
		await playground.changesOption(type, "");
		await playground.invalidOptionsForDateStyleAreVisible(true);
	});

	await test.step("sees secondary formatter: formatRange", async () => {
		const formatter: keyof Intl.DateTimeFormat = "formatRange";
		await playground.seesSecondaryFormatter(formatter);
		await playground.seesSecondaryFormatterContent(formatter, `"4/24/2022 – 10/24/2022"`);
	});
});
