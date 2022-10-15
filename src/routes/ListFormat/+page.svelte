<script lang="ts">
	import { browser } from '$app/environment';
	import { page, navigating} from '$app/stores';

	import ListFormat from '$lib/components/pages/ListFormat.svelte';
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
	<title>ListFormat</title>
</svelte:head>

{#if $navigating }
	<ProgressBar />
{/if}

<Header header="ListFormat" />

<CompatData optionsType="support" {data} />

{#if browser}
	<ListFormat browserCompatData={data} bind:locale={$selectedLocale} />
{:else}
	<ListFormat browserCompatData={data} {locale} />
{/if}
