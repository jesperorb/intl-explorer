<script lang="ts">
	import PluralRules from "$pages/PluralRules.svelte";
	import Spacing from "$ui/Spacing.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";

	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";

	import { settings } from "$store/settings";
	import { loadJson } from "$utils/load-json";

	let browserCompatData = $settings.showBrowserSupport
		? loadJson<BrowserSupportForOption>("PluralRules")
		: Promise.resolve(undefined);
</script>

{#await browserCompatData}
	<BrowserSupport data={undefined} />
	<Spacing />
	<PluralRules />
{:then data}
	<BrowserSupport {data} />
	<Spacing />
	<PluralRules browserCompatData={data} />
{/await}
