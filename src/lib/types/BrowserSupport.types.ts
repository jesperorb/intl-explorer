import type {
	BrowserName,
	BrowserType,
	ReleaseStatement,
	StatusBlock,
	VersionValue
} from '@mdn/browser-compat-data';

export type BrowserSupportWithReleaseData = {
	versionAdded: VersionValue;
	notes?: string | string[];
	release?: ReleaseStatement;
	browserType: BrowserType;
};

export type BrowserSupportData = Record<BrowserName, BrowserSupportWithReleaseData>;
export type BrowserCompatData = {
	specUrl?: string | string[];
	mdnUrl?: string;
	support: BrowserSupportData;
	status?: StatusBlock;
};
