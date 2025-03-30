<script lang="ts">
	import Segmenter from "$pages/Segmenter.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import { settings } from "$store/settings";
	import { loadJson } from "$utils/load-json";
	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";

	let browserCompatData = $settings.showBrowserSupport
		? loadJson<BrowserSupportForOption>("Segmenter")
		: Promise.resolve(undefined);
</script>

{#await browserCompatData}
	<BrowserSupport data={undefined} />
	<Spacing />
	<Segmenter />
{:then data}
	<BrowserSupport {data} />
	<Spacing />
	<Segmenter browserCompatData={data} />
{/await}
