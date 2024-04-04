<script lang="ts">
	import NumberFormat from "$lib/components/pages/NumberFormat.Unit.svelte";
	import Spacing from "$lib/components/ui/Spacing.svelte";
	import BrowserSupport from "$lib/components/ui/BrowserSupport/BrowserSupport.svelte";

	import { settings } from "$lib/store/settings";

	import type { PageData } from "./$types";

	export let data: PageData;

	let browserCompatData = $settings.showBrowserSupport ? data : null;
</script>

{#if $settings.showBrowserSupport}
	<BrowserSupport {data} />
	<Spacing />
{/if}

<NumberFormat {browserCompatData} />
