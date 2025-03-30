<script lang="ts">
	import Collator from "$pages/Collator.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";

	import { settings } from "$store/settings";
	import { loadJson } from "$utils/load-json";

	let browserCompatData = $settings.showBrowserSupport
		? loadJson<BrowserSupportForOption>("Collator")
		: Promise.resolve(undefined);
</script>

{#await browserCompatData}
	<BrowserSupport data={undefined} />
	<Spacing />
	<Collator />
{:then data}
	<BrowserSupport {data} />
	<Spacing />
	<Collator browserCompatData={data} />
{/await}
