export const style = [undefined, "long", "short", "narrow"] as const;
export const localeMatcher = [undefined, "best fit", "lookup"] as const;
export const roundingPriority = ["auto", "morePrecision", "lessPrecision", undefined] as const;
export const roundingIncrement = [
	1,
	2,
	5,
	10,
	20,
	25,
	50,
	100,
	200,
	250,
	500,
	1000,
	2000,
	2500,
	5000,
	undefined
] as const;
export const roundingMode = [
	"ceil",
	"floor",
	"expand",
	"trunc",
	"halfCeil",
	"halfFloor",
	"halfExpand",
	"halfTrunc",
	"halfEven",
	undefined
] as const;
export const trailingZeroDisplay = ["auto", "stripIfInteger", undefined] as const;
