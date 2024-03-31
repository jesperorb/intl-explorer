<script lang="ts">
	import { browser } from '$app/environment';
	import { page} from '$app/stores';

	import ListFormat from '$lib/components/pages/ListFormat.svelte';
	import BrowserSupport from '$lib/components/ui/BrowserSupport/BrowserSupport.svelte';
  import Spacing from '$lib/components/ui/Spacing.svelte';

	import { getLocaleForSSR } from '$lib/utils/get-locale';
	import { selectedLocale } from '$lib/store/selected-locale';

	import type { PageData } from './$types';
	import { settings } from '$lib/store/settings';
	export let data: PageData;

	const locale = getLocaleForSSR($page);
	let browserCompatData = $settings.showBrowserSupport ? data : null;

</script>

{#if $settings.showBrowserSupport}
	<BrowserSupport {data} />
	<Spacing />
{/if}

{#if browser}
	<ListFormat {browserCompatData} bind:locale={$selectedLocale} />
{:else}
	<ListFormat {browserCompatData} {locale} />
{/if}
