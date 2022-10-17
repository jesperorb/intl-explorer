import { formatMethods, type FormatMethodsKeys } from '$lib/format-methods';
import { writeFile } from 'node:fs';
import { resolve } from 'node:path';
import bcd, {
	type BrowserName,
	type Browsers,
	type BrowserType,
	type CompatData,
	type Identifier,
	type SimpleSupportStatement,
	type SupportStatement
} from '@mdn/browser-compat-data';
import type {
	BrowserCompatData,
	BrowserSupportData,
	BrowserSupportWithReleaseData,
	BrowserTypeHeader
} from '$lib/types/BrowserSupport.types';

const browserTypePosition: Record<BrowserType, number> = {
	desktop: 0,
	mobile: 1,
	server: 3,
	xr: 4
};

const desktopToMobileName: Partial<Record<BrowserName, BrowserName>> = {
	chrome: 'chrome_android',
	firefox: 'firefox_android',
	opera: 'opera_android',
	safari: 'safari_ios'
};

const excludedBrowserNames: BrowserName[] = ['ie', 'oculus'];

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

const getOptionsForProperty = (compatData: CompatData, property: FormatMethodsKeys) => {
	const allPropertiesOnMethod = compatData.javascript.builtins.Intl[property][property];
	const options = Object.entries(allPropertiesOnMethod).filter(([key]) => key.includes('options'));
	const hasNestedObjectProperty = options && options[0] && options[0][0] === 'options_parameter';
	if (hasNestedObjectProperty) {
		return Object.entries(options[0][1]).filter(([key]) => key.includes('options'));
	}
	return options;
};

const browserToSupportData =
	(browsers: Browsers) =>
	(
		[browserName, data]: [BrowserName, SupportStatement],
		_index: number,
		array: [BrowserName, SupportStatement][]
	): [BrowserName, BrowserSupportWithReleaseData] => {
		const versionAdded = getPropertyFromSupportStatement(data, 'version_added');
		const browser = browsers[browserName];
		const mobileBrowserName = desktopToMobileName[browserName];
		const mobileVersion =
			browser.type === 'desktop' && mobileBrowserName
				? array.find(([name]) => name === mobileBrowserName)
				: undefined;
		const mobileVersionAdded = mobileVersion
			? getPropertyFromSupportStatement(mobileVersion[1], 'version_added')
			: undefined;
		const supportData: BrowserSupportWithReleaseData = {
			browserName: browser.name,
			versionAdded,
			hasMobileEquivalent: Boolean(mobileVersion),
			mobileVersionAdded,
			browserType: browser.type,
			partialSupport: Boolean(mobileVersion) && !mobileVersionAdded
		};
		return [browserName, supportData];
	};

const sortCompatData = (
	[, aData]: [BrowserName, BrowserSupportWithReleaseData],
	[, bData]: [BrowserName, BrowserSupportWithReleaseData]
) => {
	return browserTypePosition[aData.browserType] - browserTypePosition[bData.browserType];
};

const filterExludedBrowsers = ([browserName]: [BrowserName, SupportStatement]) =>
	!excludedBrowserNames.includes(browserName);

const createHeaders = (support: [BrowserName, BrowserSupportWithReleaseData][]) => {
	const headers: Partial<Record<BrowserType, BrowserTypeHeader>> = {};
	for (let index = 0; index < support.length; index++) {
		const previous = support[index - 1];
		const current = support[index];
		const currentBrowserType = current ? current[1].browserType : undefined;
		const previousBrowserType = previous ? previous[1].browserType : undefined;
		const diff = currentBrowserType !== previousBrowserType;
		if (currentBrowserType && !headers[currentBrowserType]) {
			headers[currentBrowserType] = {
				start: index + 1,
				name: currentBrowserType
			};
		}
		if (previousBrowserType && diff && index !== 0) {
			if (headers[previousBrowserType]) {
				(headers[previousBrowserType] as BrowserTypeHeader).end = index + 1;
			}
		}
		if (index === support.length - 1 && previousBrowserType && headers[previousBrowserType]) {
			(headers[previousBrowserType] as BrowserTypeHeader).end = support.length + 1;
		}
	}
	return headers;
}

const getCompatDataWithBrowserData = (
	compatData: CompatData,
	property: FormatMethodsKeys
): BrowserCompatData => {
	const { browsers } = compatData;
	const propertyData = compatData.javascript.builtins.Intl[property];
	const support = getSupportDataForProperty(propertyData)
		.filter(filterExludedBrowsers)
		.map(browserToSupportData(browsers))
		.sort(sortCompatData);
	const options = getOptionsForProperty(compatData, property).map(([key, value]) => {
		const supportDataForOption = getSupportDataForProperty(value as Identifier);
		const formattedOptions = supportDataForOption
			.filter(filterExludedBrowsers)
			.map(browserToSupportData(browsers))
			.sort(sortCompatData);
		const [, option] = key.split('_');
		return [option, Object.fromEntries(formattedOptions)];
	});
	return {
		mdnUrl: propertyData?.__compat?.mdn_url,
		specUrl: propertyData?.__compat?.spec_url,
		browserTypeHeaders: Object.values(createHeaders(support)),
		support: Object.fromEntries(support) as BrowserSupportData,
		optionsSupport: Object.fromEntries(options)
	};
};

export const writeCompatData = () => {
	const writeData = formatMethods.map((method) => [
		method,
		getCompatDataWithBrowserData(bcd, method)
	]);
	writeFile(
		resolve(process.cwd(), 'static', `Playground-compat-data.json`),
		JSON.stringify(Object.fromEntries(writeData)),
		(error) => {
			if (error) {
				console.log(error);
			}
		}
	);
	writeData.forEach(([method, data]) => {
		writeFile(
			resolve(process.cwd(), 'static', `${method}-compat-data.json`),
			JSON.stringify(data),
			(error) => {
				if (error) {
					console.log(error);
				}
			}
		);
	});
};
