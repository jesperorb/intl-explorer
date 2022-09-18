export type Route = {
	path: string;
	name: string;
	sublink?: boolean;
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
	},
	{
		path: "NumberFormat/Currency",
		name: "Currency",
		sublink: true,
	},
	{
		path: "NumberFormat/Unit",
		name: "Unit",
		sublink: true,
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
