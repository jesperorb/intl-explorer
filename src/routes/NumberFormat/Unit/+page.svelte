<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

	import NumberFormat from '$lib/components/pages/NumberFormat.Unit.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Header from '$lib/components/ui/Header.svelte';

  import { selectedLocale } from '$lib/store/selected-locale';
  import { getLocaleForSSR } from '$lib/utils/get-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);
</script>

<svelte:head>
	<title>NumberFormat Unit</title>
</svelte:head>

<Header header="NumberFormat" />

<CompatData {data} />

{#if browser}
	<NumberFormat bind:locale={$selectedLocale} />
{:else}
	<NumberFormat {locale} />
{/if}

