<script lang="ts">
	import Segmenter from '$lib/components/pages/Segmenter.svelte';
	import BrowserSupport from '$lib/components/ui/BrowserSupport/BrowserSupport.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';

	import { selectedLocale } from '$lib/store/selected-locale';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
  import { getLocaleForSSR } from '$lib/utils/get-locale';

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
	<Segmenter {browserCompatData} bind:locale={$selectedLocale} />
{:else}
	<Segmenter {browserCompatData} {locale} />
{/if}
