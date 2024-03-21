import type { BrowserType, VersionValue } from '@mdn/browser-compat-data';

export type BrowserCoverage = "full" | "partial" | "none";

export type BrowserReleaseData = {
	versionAdded: VersionValue;
	browserType: BrowserType;
	browserName: string;
};

export type BrowserSupportForOption = {
	coverage: BrowserCoverage;
	support: Record<string, BrowserReleaseData>
}

export type BrowserSupportDataForOptions = Record<string, BrowserSupportForOption>;

export type BrowserSupportDataForMethod = {
	specUrl?: string | string[];
	mdnUrl?: string;
	support: Record<string, BrowserReleaseData>;
	coverage: BrowserCoverage;
	optionsSupport?: BrowserSupportDataForOptions;
	formattersSupport?: BrowserSupportDataForOptions;
};
