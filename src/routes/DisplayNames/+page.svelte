<script lang="ts">
	import DisplayNames from "$pages/DisplayNames.svelte";
	import BrowserSupport from "$ui/BrowserSupport/BrowserSupport.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import { settings } from "$store/settings";

	import type { PageData } from "./$types";

	export let data: PageData;
</script>

{#if $settings.showBrowserSupport}
	<BrowserSupport {data} />
	<Spacing />
{/if}

<DisplayNames />
