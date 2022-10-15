<script lang="ts">
	import { browser } from '$app/environment';
	import { page, navigating } from '$app/stores';

	import RelativeTimeFormat from '$lib/components/pages/RelativeTimeFormat.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Header from '$lib/components/ui/Header.svelte';

	import { getLocaleForSSR } from '$lib/utils/get-locale';
	import { selectedLocale } from '$lib/store/selected-locale';

	import type { PageData } from './$types';
  import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	export let data: PageData;

	const locale = getLocaleForSSR($page);
</script>

<svelte:head>
	<title>RelativeTimeFormat</title>
</svelte:head>

{#if $navigating }
	<ProgressBar />
{/if}

<Header header="RelativeTimeFormat" />

<CompatData optionsType="support" {data} />

{#if browser}
	<RelativeTimeFormat browserCompatData={data}  bind:locale={$selectedLocale} />
{:else}
	<RelativeTimeFormat browserCompatData={data}  {locale} />
{/if}
