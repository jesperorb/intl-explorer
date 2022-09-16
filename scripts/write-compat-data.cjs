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
	const support = Object.entries(compatDataForProperty?.support ?? {})
		.filter(([browserName]) => !excludedBrowserNames.includes(browserName))
		.map(([browserName, data]) => {
			const versionAdded = getPropertyFromSupportStatement(data, 'version_added');
			const browser = browsers[browserName];
			const hasReleaseVersion = versionAdded && typeof versionAdded === 'string';
			const release = hasReleaseVersion ? browser.releases[versionAdded] : undefined;
			const notes = getPropertyFromSupportStatement(data, 'notes');
			const supportData = {
				versionAdded,
				notes,
				release,
				browserType: browser.type
			};
			return [browserName, supportData];
		});
	support.sort(
		([, aData], [, bData]) =>
			browserTypePosition[aData.browserType] - browserTypePosition[bData.browserType]
	);
	return {
		mdnUrl: compatDataForProperty?.mdn_url,
		specUrl: compatDataForProperty?.spec_url,
		status: compatDataForProperty?.status,
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
