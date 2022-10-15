<script lang="ts">
	import Segmenter from '$lib/components/pages/Segmenter.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Header from '$lib/components/ui/Header.svelte';
	import { selectedLocale } from '$lib/store/selected-locale';
	import { page, navigating } from '$app/stores';
	import { browser } from '$app/environment';
  import { getLocaleForSSR } from '$lib/utils/get-locale';

	import type { PageData } from './$types';
  import ProgressBar from '$lib/components/ui/ProgressBar.svelte';
	export let data: PageData;

	const locale = getLocaleForSSR($page);

</script>

<svelte:head>
	<title>Segmenter</title>
</svelte:head>

{#if $navigating }
	<ProgressBar />
{/if}

<Header header="Segmenter" />

<CompatData optionsType="support" {data} />

{#if browser}
	<Segmenter browserCompatData={data} bind:locale={$selectedLocale} />
{:else}
	<Segmenter browserCompatData={data} {locale} />
{/if}
