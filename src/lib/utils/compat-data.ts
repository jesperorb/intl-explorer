import type { FormatMethodsKeys } from '$lib/format-methods';
import type {
	BrowserCompatData,
	BrowserSupportData,
	BrowserSupportWithReleaseData
} from '$lib/types/BrowserSupport.types';
import type {
	BrowserName,
	BrowserType,
	CompatData,
	SimpleSupportStatement,
	SupportStatement
} from '@mdn/browser-compat-data';

const browserTypePosition: Record<BrowserType, number> = {
	desktop: 0,
	mobile: 1,
	server: 3,
	xr: 4
};

const excludedBrowserNames: Partial<BrowserName>[] = ['ie', 'oculus'];

const getPropertyFromSupportStatement = <Key extends keyof SimpleSupportStatement>(
	statement: SupportStatement,
	key: Key
): SimpleSupportStatement[Key] => {
	if (Array.isArray(statement)) {
		return statement[0][key];
	}
	return statement[key];
};

export const getCompatDataWithBrowserData = (
	compatData: CompatData,
	property: FormatMethodsKeys
): BrowserCompatData => {
	const compatDataForProperty = compatData.javascript.builtins.Intl[property].__compat;
	const browsers = compatData.browsers;
	const support = Object.entries(compatDataForProperty?.support ?? {})
		.filter(([browserName]) => !excludedBrowserNames.includes(browserName as BrowserName))
		.map(([browserName, data]) => {
			const versionAdded = getPropertyFromSupportStatement(data, 'version_added');
			const browser = browsers[browserName as BrowserName];
			const hasReleaseVersion = versionAdded && typeof versionAdded === 'string';
			const release = hasReleaseVersion ? browser.releases[versionAdded] : undefined;
			const notes = getPropertyFromSupportStatement(data, 'notes');
			const supportData: BrowserSupportWithReleaseData = {
				versionAdded,
				notes,
				release,
				browserType: browser.type
			};
			return [browserName, supportData] as [BrowserName, BrowserSupportWithReleaseData];
		});
	support.sort(
		([, aData], [, bData]) =>
			browserTypePosition[aData.browserType] - browserTypePosition[bData.browserType]
	);
	return {
		mdnUrl: compatDataForProperty?.mdn_url,
		specUrl: compatDataForProperty?.spec_url,
		status: compatDataForProperty?.status,
		support: Object.fromEntries(support) as BrowserSupportData
	};
};

export const formatBrowserName = (browserName: string): string => {
	return browserName.charAt(0).toUpperCase() + browserName.replace('_', ' ').slice(1);
};
