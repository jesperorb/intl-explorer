import type { PlaygroundOption } from '$lib/playground/playground.schema';

export const defaultNumberRange = [1, 2, 3, 4, 5];

export const clampValue = (
	option: PlaygroundOption<'NumberFormat'>,
	value: string | boolean | null | undefined
) => {
	if (option.valueType !== 'number') return value;
	if (typeof value !== 'string') return value;
	const parsed = parseInt(value, 10);
	if (isNaN(parsed)) return option.defaultValue;
	if(!option.max && !option.min) return parsed;
	const clampedMax = option.max && parsed > option.max ? option.max : parsed;
	return option.min && parsed < option.min ? Math.max(option.min, clampedMax) : clampedMax;
};

export const fallbackDisplayNames: Record<Intl.DisplayNamesOptions['type'], string> = {
	language: 'en-US',
	region: 'US',
	script: 'Latn',
	calendar: 'gregory',
	dateTimeField: 'month',
	currency: 'USD'
};

export const tryDisplayNames = (
	code: string,
	language: string,
	options: Intl.DisplayNamesOptions
): string => {
	try {
		return new Intl.DisplayNames(language, options).of(code) ?? fallbackDisplayNames[options.type];
	} catch (e) {
		return fallbackDisplayNames[options.type];
	}
};
