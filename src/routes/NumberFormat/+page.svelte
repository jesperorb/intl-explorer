<script lang="ts">
	import NumberFormat from "$pages/NumberFormat.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import { getMessages } from "$i18n/util";
	import { settings } from "$store/settings";

	import type { PageData } from "./$types";

	export let data: PageData;

	let browserCompatData = $settings.showBrowserSupport ? data : null;

	const m = getMessages();
</script>

{#if $settings.showBrowserSupport}
	<BrowserSupport {data} />
	<Spacing />
{/if}
<p>
	{m.seeAlso()} <a href="NumberFormat/Currency">Currency</a>
	{m.and()} <a href="/NumberFormat/Unit">Unit</a>.
</p>
<Spacing />
<NumberFormat {browserCompatData} />
