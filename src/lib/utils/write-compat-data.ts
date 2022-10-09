import { formatMethods, type FormatMethodsKeys } from '$lib/format-methods';
import { writeFile } from 'node:fs';
import { resolve } from 'node:path';
import bcd, {
	type BrowserName,
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

const getCompatDataWithBrowserData = (
	compatData: CompatData,
	property: FormatMethodsKeys
): BrowserCompatData => {
	const compatDataForProperty = compatData.javascript.builtins.Intl[property].__compat;
	let filteredOptions = Object.entries(
		compatData.javascript.builtins.Intl[property][property]
	).filter(([key]) => key.includes('options'));
	if (filteredOptions && filteredOptions[0] && filteredOptions[0][0] === 'options_parameter') {
		filteredOptions = Object.entries(filteredOptions[0][1]).filter(([key]) =>
			key.includes('options')
		) as any;
	}
	const { browsers } = compatData;
	const supportObject = compatDataForProperty?.support ?? {};
	const support = (Object.entries(supportObject) as [BrowserName, SupportStatement][])
		.filter(([browserName]) => !excludedBrowserNames.includes(browserName))
		.map(([browserName, data]) => {
			const versionAdded = getPropertyFromSupportStatement(data, 'version_added');
			const browser = browsers[browserName];
			const mobileBrowserName = desktopToMobileName[browserName];
			const mobileVersion =
				browser.type === 'desktop' && mobileBrowserName
					? supportObject[mobileBrowserName]
					: undefined;
			const mobileVersionAdded = mobileVersion
				? getPropertyFromSupportStatement(mobileVersion, 'version_added')
				: undefined;
			const mobileHasReleaseVersion = mobileVersionAdded && typeof versionAdded === 'string';
			const mobileRelease = mobileHasReleaseVersion ? browser.releases[versionAdded] : undefined;
			const hasReleaseVersion = versionAdded && typeof versionAdded === 'string';
			const release = hasReleaseVersion ? browser.releases[versionAdded] : undefined;
			const notes = getPropertyFromSupportStatement(data, 'notes');
			const supportData: BrowserSupportWithReleaseData = {
				browserName: browser.name,
				versionAdded,
				hasMobileEquivalent: Boolean(mobileVersion),
				mobileVersionAdded,
				notes,
				release,
				browserType: browser.type,
				mobileRelease,
				partialSupport: Boolean(mobileVersion) && !mobileVersionAdded
			};
			return [browserName, supportData];
		}) as [BrowserName, BrowserSupportWithReleaseData][];
	support.sort(
		([, aData], [, bData]) =>
			browserTypePosition[aData.browserType] - browserTypePosition[bData.browserType]
	);
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
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				headers[previousBrowserType].end = index + 1;
			}
		}
		if (index === support.length - 1 && previousBrowserType && headers[previousBrowserType]) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			headers[previousBrowserType].end = support.length + 1;
		}
	}
	// TODO: Makes this more generic
	const options = filteredOptions.map(([key, value]) => {
		const optionsCompat = (value as Identifier).__compat;
		const supportObjectForOption = optionsCompat?.support ?? {};
		const formattedOptions = (
			Object.entries(supportObjectForOption) as [BrowserName, SupportStatement][]
		)
			.filter(([browserName]) => !excludedBrowserNames.includes(browserName))
			.map(([browserName, optionData]) => {
				const versionAdded = getPropertyFromSupportStatement(optionData, 'version_added');
				const browser = browsers[browserName];
				const mobileBrowserName = desktopToMobileName[browserName];
				const mobileVersion =
					browser.type === 'desktop' && mobileBrowserName
						? supportObjectForOption[mobileBrowserName]
						: undefined;
				const mobileVersionAdded = mobileVersion
					? getPropertyFromSupportStatement(mobileVersion, 'version_added')
					: undefined;
				const mobileHasReleaseVersion = mobileVersionAdded && typeof versionAdded === 'string';
				const mobileRelease = mobileHasReleaseVersion ? browser.releases[versionAdded] : undefined;
				const hasReleaseVersion = versionAdded && typeof versionAdded === 'string';
				const release = hasReleaseVersion ? browser.releases[versionAdded] : undefined;
				const notes = getPropertyFromSupportStatement(optionData, 'notes');
				const supportData: BrowserSupportWithReleaseData = {
					browserName: browser.name,
					versionAdded,
					hasMobileEquivalent: Boolean(mobileVersion),
					mobileVersionAdded,
					notes,
					release,
					browserType: browser.type,
					mobileRelease,
					partialSupport: Boolean(mobileVersion) && !mobileVersionAdded
				};
				return [browserName, supportData];
			}) as [BrowserName, BrowserSupportWithReleaseData][];
		const [, option] = key.split('_');
		formattedOptions.sort(
			([, aData], [, bData]) =>
				browserTypePosition[aData.browserType] - browserTypePosition[bData.browserType]
		);
		return [option, Object.fromEntries(formattedOptions)];
	});
	return {
		mdnUrl: compatDataForProperty?.mdn_url,
		specUrl: compatDataForProperty?.spec_url,
		status: compatDataForProperty?.status,
		browserTypeHeaders: Object.values(headers),
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
