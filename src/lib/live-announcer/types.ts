import type { AriaAttributes } from "svelte/elements";

export type AnnounceOptions = {
	timeout?: number;
	setting: NonNullable<AriaAttributes["aria-live"]>
}

export type AnnounceFunction = (message: string, options?: AnnounceOptions) => void;
