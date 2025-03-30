<script lang="ts">
	import {
		liveAnnouncerRegionIdAssertive,
		liveAnnouncerRegionIdPolite
	} from "$lib/live-announcer/constants";
</script>

<div id={liveAnnouncerRegionIdPolite} aria-live="polite"></div>
<div id={liveAnnouncerRegionIdAssertive} aria-live="assertive"></div>
