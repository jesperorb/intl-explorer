import type { PlaygroundOption } from '$lib/playground/playground.schema';

export const defaultNumberRange = [1, 2, 3, 4, 5];

export const clampValue = (
	option: PlaygroundOption<'ListFormat'>,
	value: string | boolean | null | undefined
) => {
	if (option.valueType !== 'number') return value;
	if (typeof value !== 'string') return value;
	const parsed = parseInt(value, 10);
	if (isNaN(parsed)) return option.defaultValue;
	const clampedMax = option.max && parsed > option.max ? option.max : parsed;
	return option.min && parsed < option.min ? Math.max(option.min, clampedMax) : clampedMax;
};
