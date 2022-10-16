import type { BrowserType, VersionValue } from '@mdn/browser-compat-data';

export type BrowserTypeHeader = {
	start: number;
	end?: number;
	name: BrowserType;
};

export type BrowserSupportWithReleaseData = {
	versionAdded: VersionValue;
	mobileVersionAdded?: VersionValue;
	browserType: BrowserType;
	browserName: string;
	partialSupport: boolean;
	hasMobileEquivalent: boolean;
};

export type OptionsSupportData = Record<string, BrowserSupportWithReleaseData>;
export type BrowserSupportData = Record<string, BrowserSupportWithReleaseData>;
export type BrowserCompatData = {
	specUrl?: string | string[];
	mdnUrl?: string;
	support: BrowserSupportData;
	browserTypeHeaders: BrowserTypeHeader[];
	optionsSupport?: OptionsSupportData;
};
