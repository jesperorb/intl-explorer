/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This file should be a ts file but running just a single file
 * with node/ts-node is a shitshow
 */

const bcd = require('@mdn/browser-compat-data');

const { writeFile } = require('fs');
const { resolve } = require('path');

const formatMethods = [
	'DateTimeFormat',
	'NumberFormat',
	'ListFormat',
	'RelativeTimeFormat',
	'PluralRules',
	'Collator',
	'Segmenter'
];

const browserTypePosition = {
	desktop: 0,
	mobile: 1,
	server: 3,
	xr: 4
};

const desktopToMobileName = {
	chrome: "chrome_android",
	firefox: "firefox_android",
	opera: "opera_android",
	safari: "safari_ios",
}

const excludedBrowserNames = ['ie', 'oculus'];

const getPropertyFromSupportStatement = (statement, key) => {
	if (Array.isArray(statement)) {
		return statement[0][key];
	}
	return statement[key];
};

const getCompatDataWithBrowserData = (compatData, property) => {
	const compatDataForProperty = compatData.javascript.builtins.Intl[property].__compat;
	const browsers = compatData.browsers;
	const supportObject = compatDataForProperty?.support ?? {};
	const support = Object.entries(compatDataForProperty?.support ?? {})
		.filter(([browserName]) => !excludedBrowserNames.includes(browserName))
		.map(([browserName, data]) => {
			const versionAdded = getPropertyFromSupportStatement(data, 'version_added');
			const browser = browsers[browserName];
			const mobileVersion = browser.type === "desktop" ? supportObject[desktopToMobileName[browserName]] : undefined;
			const mobileVersionAdded = mobileVersion ? getPropertyFromSupportStatement(mobileVersion, 'version_added') : undefined;
			const mobileHasReleaseVersion = mobileVersionAdded && typeof versionAdded === 'string';
			const mobileRelease = mobileHasReleaseVersion ? browser.releases[versionAdded] : undefined;
			const hasReleaseVersion = versionAdded && typeof versionAdded === 'string';
			const release = hasReleaseVersion ? browser.releases[versionAdded] : undefined;
			const notes = getPropertyFromSupportStatement(data, 'notes');
			const supportData = {
				versionAdded,
				hasMobileEquivalent: Boolean(mobileVersion),
				mobileVersionAdded,
				notes,
				release,
				browserType: browser.type,
				mobileRelease
			};
			return [browserName, supportData];
		});
	support.sort(
		([, aData], [, bData]) =>
			browserTypePosition[aData.browserType] - browserTypePosition[bData.browserType]
	);
	let headers = {};
	for (let index = 0; index < support.length; index++) {
		const previous = support[index - 1];
		const current = support[index];
		const currentBrowserType = current ? current[1].browserType : undefined;
		const previousBrowserType = previous ? previous[1].browserType : undefined;
		const diff = currentBrowserType !== previousBrowserType;
		if (!headers[currentBrowserType]) {
			headers[currentBrowserType] = {
				start: index + 1,
				name: currentBrowserType,
			}
		}
		if (diff && index !== 0) {
			headers[previousBrowserType].end = index + 1;
		}
		if(index === support.length - 1) {
			headers[previousBrowserType].end = support.length + 1;
		}
	}
	return {
		mdnUrl: compatDataForProperty?.mdn_url,
		specUrl: compatDataForProperty?.spec_url,
		status: compatDataForProperty?.status,
		browserTypeHeaders: Object.values(headers),
		support: Object.fromEntries(support)
	};
};

formatMethods.forEach((method) => {
	const data = getCompatDataWithBrowserData(bcd, method);
	writeFile(
		resolve(process.cwd(), 'static', `${method}-compat-data.json`),
		JSON.stringify(data),
		(error) => {
			console.log(error);
		}
	);
});
