<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

	import DateTimeFormat from '$lib/components/pages/DateTimeFormat.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Header from '$lib/components/ui/Header.svelte';

  import { selectedLocale } from '$lib/store/selected-locale';
  import { getLocaleForSSR } from '$lib/utils/get-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);

</script>

<Header header="DateTimeFormat" />

<CompatData {data} />

{#if browser}
	<DateTimeFormat bind:locale={$selectedLocale} />
{:else}
	<DateTimeFormat {locale} />
{/if}

