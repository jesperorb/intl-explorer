<script lang="ts">
	import DateTimeFormat from "$pages/DateTimeFormat.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";

	import { settings } from "$store/settings";
	import { loadJson } from "$utils/load-json";

	let browserCompatData = $settings.showBrowserSupport
		? loadJson<BrowserSupportForOption>("DateTimeFormat")
		: Promise.resolve(undefined);
</script>

{#await browserCompatData}
	<BrowserSupport data={undefined} />
	<Spacing />
	<DateTimeFormat />
{:then data}
	<BrowserSupport {data} />
	<Spacing />
	<DateTimeFormat browserCompatData={data} />
{/await}
