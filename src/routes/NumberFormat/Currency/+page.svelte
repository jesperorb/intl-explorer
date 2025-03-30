<script lang="ts">
	import NumberFormat from "$pages/NumberFormat.Currency.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";

	import { settings } from "$store/settings";
	import { loadJson } from "$utils/load-json";

	let browserCompatData = $settings.showBrowserSupport
		? loadJson<BrowserSupportForOption>("NumberFormat")
		: Promise.resolve(undefined);
</script>

{#await browserCompatData}
	<BrowserSupport data={undefined} />
	<Spacing />
	<NumberFormat />
{:then data}
	<BrowserSupport {data} />
	<Spacing />
	<NumberFormat browserCompatData={data} />
{/await}
