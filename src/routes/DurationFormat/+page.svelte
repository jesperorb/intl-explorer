<script lang="ts">
	import DurationFormat from "$pages/DurationFormat.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";

	import { settings } from "$store/settings";
	import { loadJson } from "$utils/load-json";

	let browserCompatData = $settings.showBrowserSupport
		? loadJson<BrowserSupportForOption>("DurationFormat")
		: Promise.resolve(undefined);
</script>

{#await browserCompatData}
	<BrowserSupport data={undefined} />
	<Spacing />
	<DurationFormat />
{:then data}
	<BrowserSupport {data} />
	<Spacing />
	<DurationFormat browserCompatData={data} />
{/await}
