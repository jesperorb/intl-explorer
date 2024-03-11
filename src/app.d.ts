// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

type UmamiAnalytics = {
	track: (name: string, data?: Record<string, unknown>) => void
}

declare interface Window {
	umami?: UmamiAnalytics
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
		new(locales?: LocalesArgument, options?: DurationFormatOptions): DurationFormat;
	};
}