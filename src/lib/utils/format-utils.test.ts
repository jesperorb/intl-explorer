import { describe, expect, test } from "vitest";
import { camelCaseToWords, clampValue, formatLocaleForUrl, formatLocalesForPrint, tryFormat } from "./format-utils";
import { numberFormatOptionFactory } from "./factory";

describe("clampValue", () => {
	test("clamp max", () => {
		expect(
			clampValue(
				numberFormatOptionFactory({
					valueType: "number",
					max: 9
				}),
				"12"
			)
		).toEqual(9);
	});

	test("clamp min", () => {
		expect(
			clampValue(
				numberFormatOptionFactory({
					valueType: "number",
					min: 1
				}),
				"-19"
			)
		).toEqual(1);
	});

	test("no clamp if no number", () => {
		expect(
			clampValue(
				numberFormatOptionFactory({
					valueType: "boolean",
					min: 1
				}),
				"true"
			)
		).toEqual("true");
	});

	test("fallback to defaultValue if faulty value", () => {
		expect(
			clampValue(
				numberFormatOptionFactory({
					valueType: "number",
					min: 1
				}),
				"true"
			)
		).toEqual(undefined);
	});
});

describe("tryFormat", () => {
	test("fail on faulty format", () => {
		expect(
			tryFormat(() =>
				Intl.NumberFormat(undefined, {
					style: "currency"
				}).format(19)
			)
		).toEqual("Currency code is required with currency style.");
	});

	test("output of fine format", () => {
		expect(
			tryFormat(() =>
				Intl.NumberFormat(undefined, {
					style: "currency",
					currency: "USD"
				}).format(19)
			)
		).toEqual("$19.00");
	});
});

describe("camelCaseToWords", () => {
	test("convert", () => {
		expect(camelCaseToWords("iAmACamel")).toEqual("I Am A Camel");
	});
});

describe("formatLocalesForPrint", () => {
	test("format one locale", () => {
		expect(formatLocalesForPrint(["sv"])).toEqual('"sv"');
	});

	test("format multiple locale", () => {
		expect(formatLocalesForPrint(["sv", "en"])).toEqual("[\"sv\",\"en\"]");
	});

	test("format zero locale", () => {
		expect(formatLocalesForPrint([])).toEqual("undefined");
	});
});

describe("formatLocaleForUrl", () => {
	test("format locales", () => {
		expect(formatLocaleForUrl(["sv"])).toEqual('?locale=sv');
	});
	test("format locales", () => {
		expect(formatLocaleForUrl(["sv", "en"])).toEqual('?locale=sv,en');
	});
});
