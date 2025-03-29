<script lang="ts">
	import NumberFormat from "$pages/NumberFormat.Unit.svelte";
	import Spacing from "$ui/Spacing.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";

	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";

	import { settings } from "$store/settings";
	import { loadJson } from "$utils/load-json";

	let browserCompatData = $settings.showBrowserSupport
		? loadJson<BrowserSupportForOption>("NumberFormat")
		: Promise.resolve(undefined);
</script>

{#await browserCompatData}
	<NumberFormat />
{:then data}
	{#if $settings.showBrowserSupport}
		<BrowserSupport {data} />
		<Spacing />
	{/if}
	<NumberFormat browserCompatData={data} />
{/await}
