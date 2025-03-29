// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
	interface Platform {
		env: {
			COUNTER: DurableObjectNamespace;
		};
		context: {
			waitUntil(promise: Promise<unknown>): void;
		};
		caches: CacheStorage & { default: Cache };
	}
}

type Analytics = {
	track: (name: string, data?: Record<string, unknown>) => void;
};

declare interface Window {
	umami?: Analytics;
}

declare namespace Intl {
	interface DurationFormatOptions {
		localeMatcher?: "best fit" | "lookup" | undefined;
		style?: "long" | "short" | "narrow" | "digital" | undefined;
		years?: "long" | "short" | "narrow" | undefined;
		months?: "long" | "short" | "narrow" | undefined;
		weeks?: "long" | "short" | "narrow" | undefined;
		days?: "long" | "short" | "narrow" | undefined;
		hours?: "long" | "short" | "narrow" | undefined;
		minutes?: "long" | "short" | "narrow" | undefined;
		seconds?: "long" | "short" | "narrow" | undefined;
		milliseconds?: "long" | "short" | "narrow" | undefined;
		microseconds?: "long" | "short" | "narrow" | undefined;
		nanoseconds?: "long" | "short" | "narrow" | undefined;
		fractionalDigits?: number;
	}

	interface ResolvedDurationFormatOptions {
		locale: string;
		style: "long" | "short" | "narrow" | "digital";
	}

	interface Duration {
		years?: number;
		months?: number;
		weeks?: number;
		days?: number;
		hours?: number;
		minutes?: number;
		seconds?: number;
		milliseconds?: number;
		microseconds?: number;
		nanoseconds?: number;
	}

	interface DurationFormat {
		format(input: Duration): string;
		formatToParts(input: Duration): string;
		resolvedOptions(): ResolvedDurationFormatOptions;
	}
	const DurationFormat: {
		prototype: DurationFormat;
		new (locales?: LocalesArgument, options?: DurationFormatOptions): DurationFormat;
	};

	// Borrowing from: https://github.com/microsoft/TypeScript/blob/e66049084b40ce85e28278c29cdd9784c7a9033a/src/lib/es2023.intl.d.ts
	interface NumberFormatOptionsUseGroupingRegistry {
		min2: never;
		auto: never;
		always: never;
	}

	interface NumberFormatOptionsSignDisplayRegistry {
		negative: never;
	}

	interface NumberFormatOptions {
		roundingPriority?: "auto" | "morePrecision" | "lessPrecision" | undefined;
		roundingIncrement?:
			| 1
			| 2
			| 5
			| 10
			| 20
			| 25
			| 50
			| 100
			| 200
			| 250
			| 500
			| 1000
			| 2000
			| 2500
			| 5000
			| undefined;
		roundingMode?:
			| "ceil"
			| "floor"
			| "expand"
			| "trunc"
			| "halfCeil"
			| "halfFloor"
			| "halfExpand"
			| "halfTrunc"
			| "halfEven"
			| undefined;
		trailingZeroDisplay?: "auto" | "stripIfInteger" | undefined;
	}

	interface ResolvedNumberFormatOptions {
		roundingPriority: "auto" | "morePrecision" | "lessPrecision";
		roundingMode:
			| "ceil"
			| "floor"
			| "expand"
			| "trunc"
			| "halfCeil"
			| "halfFloor"
			| "halfExpand"
			| "halfTrunc"
			| "halfEven";
		roundingIncrement:
			| 1
			| 2
			| 5
			| 10
			| 20
			| 25
			| 50
			| 100
			| 200
			| 250
			| 500
			| 1000
			| 2000
			| 2500
			| 5000;
		trailingZeroDisplay: "auto" | "stripIfInteger";
	}

	interface NumberRangeFormatPart extends NumberFormatPart {
		source: "startRange" | "endRange" | "shared";
	}

	interface NumberFormat {
		formatRange(start: number | bigint, end: number | bigint): string;
		formatRangeToParts(start: number | bigint, end: number | bigint): NumberRangeFormatPart[];
	}

	interface PluralRulesOptions {
		roundingPriority?: "auto" | "morePrecision" | "lessPrecision" | undefined;
		roundingIncrement?:
			| 1
			| 2
			| 5
			| 10
			| 20
			| 25
			| 50
			| 100
			| 200
			| 250
			| 500
			| 1000
			| 2000
			| 2500
			| 5000
			| undefined;
		roundingMode?:
			| "ceil"
			| "floor"
			| "expand"
			| "trunc"
			| "halfCeil"
			| "halfFloor"
			| "halfExpand"
			| "halfTrunc"
			| "halfEven"
			| undefined;
		trailingZeroDisplay?: "auto" | "stripIfInteger" | undefined;
	}

	interface ResolvedPluralRulesOptions {
		roundingPriority: "auto" | "morePrecision" | "lessPrecision";
		roundingMode:
			| "ceil"
			| "floor"
			| "expand"
			| "trunc"
			| "halfCeil"
			| "halfFloor"
			| "halfExpand"
			| "halfTrunc"
			| "halfEven";
		roundingIncrement:
			| 1
			| 2
			| 5
			| 10
			| 20
			| 25
			| 50
			| 100
			| 200
			| 250
			| 500
			| 1000
			| 2000
			| 2500
			| 5000;
		trailingZeroDisplay: "auto" | "stripIfInteger";
	}
}
