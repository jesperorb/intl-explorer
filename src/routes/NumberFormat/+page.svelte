<script lang="ts">
	import NumberFormat from "$pages/NumberFormat.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import type { BrowserSupportForOption } from "$types/BrowserSupport.types";

	import { getMessages } from "$i18n/util";
	import { settings } from "$store/settings";
	import { loadJson } from "$utils/load-json";

	let browserCompatData = $settings.showBrowserSupport
		? loadJson<BrowserSupportForOption>("NumberFormat")
		: Promise.resolve(undefined);

	const m = getMessages();
</script>

{#await browserCompatData}
	<BrowserSupport data={undefined} />
	<Spacing />
	<p>
		{m.seeAlso()} <a href="NumberFormat/Currency">Currency</a>
		{m.and()} <a href="/NumberFormat/Unit">Unit</a>.
	</p>
	<Spacing />
	<NumberFormat />
{:then data}
	<BrowserSupport {data} />
	<Spacing />
	<p>
		{m.seeAlso()} <a href="NumberFormat/Currency">Currency</a>
		{m.and()} <a href="/NumberFormat/Unit">Unit</a>.
	</p>
	<Spacing />
	<NumberFormat browserCompatData={data} />
{/await}
