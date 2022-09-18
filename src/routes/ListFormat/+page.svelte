<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	import ListFormat from '$lib/components/pages/ListFormat.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Header from '$lib/components/ui/Header.svelte';

	import { getLocaleForSSR } from '$lib/utils/get-locale';
	import { selectedLocale } from '$lib/store/selected-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);
</script>

<Header header="ListFormat" />

<CompatData {data} />

{#if browser}
	<ListFormat bind:locale={$selectedLocale} />
{:else}
	<ListFormat {locale} />
{/if}
