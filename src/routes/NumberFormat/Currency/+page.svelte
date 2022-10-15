<script lang="ts">
	import { browser } from '$app/environment';
	import { page, navigating } from '$app/stores';

	import NumberFormat from '$lib/components/pages/NumberFormat.Currency.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Header from '$lib/components/ui/Header.svelte';
  import ProgressBar from '$lib/components/ui/ProgressBar.svelte';

	import { selectedLocale } from '$lib/store/selected-locale';
	import { getLocaleForSSR } from '$lib/utils/get-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);
</script>

<svelte:head>
	<title>NumberFormat Currency</title>
</svelte:head>

{#if $navigating }
	<ProgressBar />
{/if}

<Header header="NumberFormat" />

<CompatData optionsType="support" {data} />

{#if browser}
	<NumberFormat browserCompatData={data}  bind:locale={$selectedLocale} />
{:else}
	<NumberFormat browserCompatData={data} {locale} />
{/if}
