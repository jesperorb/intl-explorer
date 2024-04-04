export type Route = {
	path: string;
	name: string;
	sublink?: boolean;
	ariaLabel?: string;
	experimental?: boolean;
};

export const routes: Route[] = [
	{
		path: "NumberFormat",
		name: "NumberFormat"
	},
	{
		path: "NumberFormat/Currency",
		name: "Currency",
		sublink: true,
		ariaLabel: "NumberFormat Currency Style"
	},
	{
		path: "NumberFormat/Unit",
		name: "Unit",
		sublink: true,
		ariaLabel: "NumberFormat Unit Style"
	},
	{
		path: "DateTimeFormat",
		name: "DateTimeFormat"
	},
	{
		path: "RelativeTimeFormat",
		name: "RelativeTimeFormat"
	},
	{
		path: "ListFormat",
		name: "ListFormat"
	},
	{
		path: "PluralRules",
		name: "PluralRules"
	},
	{
		path: "Collator",
		name: "Collator"
	},
	{
		path: "Segmenter",
		name: "Segmenter"
	},
	{
		path: "DisplayNames",
		name: "DisplayNames"
	},
	{
		path: "DurationFormat",
		name: "DurationFormat",
		experimental: true
	},
	{
		path: "Locale",
		name: "Locale"
	}
];
