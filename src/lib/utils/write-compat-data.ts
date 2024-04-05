import { formatMethods, type FormatMethodsKeys } from "$lib/format-methods";
import { writeFile } from "node:fs";
import { resolve } from "node:path";
import bcd, {
	type BrowserName,
	type Browsers,
	type BrowserType,
	type CompatData,
	type CompatStatement,
	type Identifier,
	type SimpleSupportStatement,
	type SupportStatement
} from "@mdn/browser-compat-data";
import type {
	BrowserSupportDataForMethod,
	BrowserCoverage,
	BrowserReleaseData
} from "$types/BrowserSupport.types";

const browserTypePosition: Record<BrowserType, number> = {
	desktop: 0,
	mobile: 1,
	server: 3,
	xr: 4
};

const excludedBrowserNames: BrowserName[] = ["ie", "oculus"];
const secondaryFormatterNames = [
	"formatRange",
	"formatToParts",
	"formatRangeToParts",
	"selectRange"
];

const compatKey = "__compat";
const toStringKey = "toString";

const excludedPropertiesOnMethod = [compatKey, toStringKey];

type MethodsToWriteFor = FormatMethodsKeys | "Locale";
const methodsToWriteFor: MethodsToWriteFor[] = [...formatMethods, "Locale"];

const shouldAddPropertiesSupport = (method: MethodsToWriteFor) => method === "Locale";

const getPropertyFromSupportStatement = <Key extends keyof SimpleSupportStatement>(
	statement: SupportStatement,
	key: Key
): SimpleSupportStatement[Key] => {
	if (Array.isArray(statement)) {
		return statement[0][key];
	}
	return statement[key];
};

const getSupportDataForProperty = (value: Identifier) => {
	return Object.entries(value.__compat?.support ?? {}) as [BrowserName, SupportStatement][];
};

const getPropertiesForMethod = (compatData: CompatData, property: MethodsToWriteFor) => {
	const allPropertiesOnMethod = compatData.javascript.builtins.Intl[property];
	return Object.entries(allPropertiesOnMethod).filter(
		([key]) => key !== property && !excludedPropertiesOnMethod.includes(key)
	);
};

const getOptionsForProperty = (compatData: CompatData, property: MethodsToWriteFor) => {
	const allPropertiesOnMethod = compatData.javascript.builtins.Intl[property][property];
	const options = Object.entries(allPropertiesOnMethod).filter(([key]) => key.includes("options"));
	const hasNestedObjectProperty = options && options[0] && options[0][0] === "options_parameter";
	if (hasNestedObjectProperty) {
		return Object.entries(options[0][1]).filter(([key]) => key.includes("options"));
	}
	return options;
};

const getFormattersForProperty = (compatData: CompatData, property: MethodsToWriteFor) => {
	const allPropertiesOnMethod = compatData.javascript.builtins.Intl[property];
	return Object.entries(allPropertiesOnMethod).filter(([key]) =>
		secondaryFormatterNames.includes(key)
	);
};

const browserToSupportData =
	(browsers: Browsers) =>
	([browserName, data]: [BrowserName, SupportStatement]): [BrowserName, BrowserReleaseData] => {
		const versionAdded = getPropertyFromSupportStatement(data, "version_added");
		const browser = browsers[browserName];
		const supportData: BrowserReleaseData = {
			browserName: browser.name,
			versionAdded,
			browserType: browser.type
		};
		return [browserName, supportData];
	};

const sortCompatData = (
	[, aData]: [BrowserName, BrowserReleaseData],
	[, bData]: [BrowserName, BrowserReleaseData]
) => {
	return browserTypePosition[aData.browserType] - browserTypePosition[bData.browserType];
};

const filterExludedBrowsers = ([browserName]: [BrowserName, SupportStatement]) =>
	!excludedBrowserNames.includes(browserName);

export const getCoverage = (data: [BrowserName, BrowserReleaseData][]): BrowserCoverage => {
	const withVersion = data.filter(([, browserSupport]) => Boolean(browserSupport.versionAdded));
	if (withVersion.length === 0) {
		return "none";
	}
	if (withVersion.length === data.length) {
		return "full";
	}
	return "partial";
};

const optionKeyFormatter = (key: string) => {
	const [, option] = key.split("_");
	return option;
};

const formatSupportData =
	(browsers: Browsers, keyFormatter?: (key: string) => string) =>
	([key, value]: [string, Identifier | CompatStatement]) => {
		const supportDataForOption = getSupportDataForProperty(value as unknown as Identifier);
		const formattedOptions = supportDataForOption
			.filter(filterExludedBrowsers)
			.map(browserToSupportData(browsers))
			.sort(sortCompatData);
		return [
			keyFormatter ? keyFormatter(key) : key,
			{
				coverage: getCoverage(formattedOptions),
				support: Object.fromEntries(formattedOptions)
			}
		];
	};

const getCompatDataWithBrowserData = (
	compatData: CompatData,
	property: MethodsToWriteFor
): BrowserSupportDataForMethod => {
	const { browsers } = compatData;
	const propertyData = compatData.javascript.builtins.Intl[property];
	const support = getSupportDataForProperty(propertyData)
		.filter(filterExludedBrowsers)
		.map(browserToSupportData(browsers))
		.sort(sortCompatData);
	const options = getOptionsForProperty(compatData, property).map(
		formatSupportData(browsers, optionKeyFormatter)
	);
	const formatters = getFormattersForProperty(compatData, property).map(
		formatSupportData(browsers)
	);
	const properties = getPropertiesForMethod(compatData, property).map(formatSupportData(browsers));
	return {
		mdnUrl: propertyData?.__compat?.mdn_url,
		specUrl: propertyData?.__compat?.spec_url,
		support: Object.fromEntries(support) as Record<string, BrowserReleaseData>,
		coverage: getCoverage(support),
		optionsSupport: Object.fromEntries(options),
		formattersSupport: Object.fromEntries(formatters),
		propertiesSupport: shouldAddPropertiesSupport(property)
			? Object.fromEntries(properties)
			: undefined
	};
};

export const writeCompatData = () => {
	const writeData = methodsToWriteFor.map((method) => [
		method,
		getCompatDataWithBrowserData(bcd, method)
	]);
	writeFile(
		resolve(process.cwd(), "static", `Playground-compat-data.json`),
		JSON.stringify(Object.fromEntries(writeData.filter(([key]) => key !== "Locale"))),
		(error) => {
			if (error) {
				console.log(error);
			}
		}
	);
	writeData.forEach(([method, data]) => {
		if (method === "NumberFormat") {
			writeFile(
				resolve(process.cwd(), "static", "NumberFormat", "NumberFormat-compat-data.json"),
				JSON.stringify(data),
				(error) => {
					if (error) {
						console.log(error);
					}
				}
			);
		}
		writeFile(
			resolve(process.cwd(), "static", `${method}-compat-data.json`),
			JSON.stringify(data),
			(error) => {
				if (error) {
					console.log(error);
				}
			}
		);
	});
};
