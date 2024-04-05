<script lang="ts">
	import Collator from "$pages/Collator.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import { settings } from "$store/settings";

	import type { PageData } from "./$types";

	export let data: PageData;

	let browserCompatData = $settings.showBrowserSupport ? data : null;
</script>

{#if $settings.showBrowserSupport}
	<BrowserSupport {data} />
	<Spacing />
{/if}

<Collator {browserCompatData} />
