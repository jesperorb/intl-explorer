<script lang="ts">
	import DateTimeFormat from "$lib/components/pages/DateTimeFormat.svelte";
	import BrowserSupport from "$lib/components/ui/BrowserSupport/BrowserSupport.svelte";
	import Spacing from "$lib/components/ui/Spacing.svelte";

	import { settings } from "$lib/store/settings";

	import type { PageData } from "./$types";

	export let data: PageData;

	let browserCompatData = $settings.showBrowserSupport ? data : null;
</script>

{#if $settings.showBrowserSupport}
	<BrowserSupport {data} />
	<Spacing />
{/if}

<DateTimeFormat {browserCompatData} />
