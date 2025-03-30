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

<LiveAnnouncerRegion />
<slot />
