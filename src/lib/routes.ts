export type Route = {
	path: string;
	name: string;
	sublink?: boolean;
	ariaLabel?: string;
	ariaHidden?: boolean;
}

export const routes: Route[] = [
	{
		path: "DateTimeFormat",
		name: "DateTimeFormat"
	},
	{
		path: "RelativeTimeFormat",
		name: "RelativeTimeFormat",
	},
	{
		path: "NumberFormat/Currency",
		name: "NumberFormat",
		ariaHidden: true
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
		path: "ListFormat",
		name: "ListFormat",
	},
	{
		path: "PluralRules",
		name: "PluralRules",
	},
	{
		path: "Segmenter",
		name: "Segmenter",
	},
]
