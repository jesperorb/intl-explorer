<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	import Collator from '$lib/components/pages/Collator.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Header from '$lib/components/ui/Header.svelte';

	import { selectedLocale } from '$lib/store/selected-locale';
	import { getLocaleForSSR } from '$lib/utils/get-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);
</script>

<svelte:head>
	<title>Collator</title>
</svelte:head>

<Header header="Collator" />

<CompatData {data} />

{#if browser}
	<Collator bind:locale={$selectedLocale} />
{:else}
	<Collator {locale} />
{/if}
