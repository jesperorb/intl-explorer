import type {
	BrowserName,
	BrowserType,
	ReleaseStatement,
	StatusBlock,
	VersionValue
} from '@mdn/browser-compat-data';

export type BrowserTypeHeader = {
	start: number;
	end?: number;
	name: BrowserType;
};

export type BrowserSupportWithReleaseData = {
	versionAdded: VersionValue;
	mobileVersionAdded?: VersionValue;
	notes?: string | string[];
	release?: ReleaseStatement;
	browserType: BrowserType;
	browserName: string;
	partialSupport: boolean;
	mobileRelease?: ReleaseStatement;
	hasMobileEquivalent: boolean;
};

export type BrowserSupportData = Record<BrowserName, BrowserSupportWithReleaseData>;
export type BrowserCompatData = {
	specUrl?: string | string[];
	mdnUrl?: string;
	support: BrowserSupportData;
	browserTypeHeaders: BrowserTypeHeader[];
	status?: StatusBlock;
	optionsSupport?: Record<string, StatusBlock>;
};
