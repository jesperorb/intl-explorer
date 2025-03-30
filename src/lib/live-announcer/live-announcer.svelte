<script lang="ts">
	import { setContext } from "svelte";

	import type { AnnounceFunction } from "./types";

	import {
		liveAnnouncerContextKey,
		liveAnnouncerRegionIdPolite,
		liveAnnouncerRegionIdAssertive,
		defaultAnnounceOptions
	} from "./constants";

	import LiveAnnouncerRegion from "./live-announcer-region.svelte";
	import SrOnly from "$ui/SrOnly.svelte";

	type Props = {
		children?: import("svelte").Snippet;
	};

	let { children }: Props = $props();

	const announce: AnnounceFunction = (message: string, options = defaultAnnounceOptions) => {
		const elementId =
			options.setting === "polite" ? liveAnnouncerRegionIdPolite : liveAnnouncerRegionIdAssertive;
		const element = document.getElementById(elementId);
		if (!element) {
			return;
		}
		element.textContent = message;
		setTimeout(() => {
			element.textContent = "";
		}, options.timeout);
	};

	setContext(liveAnnouncerContextKey, announce);
</script>

<SrOnly>
	<LiveAnnouncerRegion />
</SrOnly>
{@render children?.()}
