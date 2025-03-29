<script lang="ts">
	import RelativeTimeFormat from "$pages/RelativeTimeFormat.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";

	import { settings } from "$store/settings";
	import { loadJson } from "$utils/load-json";

	let browserCompatData = $settings.showBrowserSupport
		? loadJson<BrowserSupportForOption>("RelativeTimeFormat")
		: Promise.resolve(undefined);
</script>

{#await browserCompatData}
	<BrowserSupport data={undefined} />
	<Spacing />
	<RelativeTimeFormat />
{:then data}
	<BrowserSupport {data} />
	<Spacing />
	<RelativeTimeFormat browserCompatData={data} />
{/await}
