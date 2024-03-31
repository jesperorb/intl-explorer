<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	import Collator from '$lib/components/pages/Collator.svelte';
	import BrowserSupport from '$lib/components/ui/BrowserSupport/BrowserSupport.svelte';
  import Spacing from '$lib/components/ui/Spacing.svelte';

	import { selectedLocale } from '$lib/store/selected-locale';
	import { settings } from '$lib/store/settings';
	import { getLocaleForSSR } from '$lib/utils/get-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);
	let browserCompatData = $settings.showBrowserSupport ? data : null;
</script>

{#if $settings.showBrowserSupport}
	<BrowserSupport {data} />
	<Spacing />
{/if}

{#if browser}
	<Collator {browserCompatData} bind:locale={$selectedLocale} />
{:else}
	<Collator {browserCompatData} {locale} />
{/if}
