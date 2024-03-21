<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

	import NumberFormat from '$lib/components/pages/NumberFormat.Unit.svelte';
  import Spacing from '$lib/components/ui/Spacing.svelte';
	import BrowserSupport from '$lib/components/ui/BrowserSupport/BrowserSupport.svelte';

  import { selectedLocale } from '$lib/store/selected-locale';
  import { getLocaleForSSR } from '$lib/utils/get-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);
</script>

<BrowserSupport {data} />
<Spacing />

{#if browser}
	<NumberFormat browserCompatData={data} bind:locale={$selectedLocale} />
{:else}
	<NumberFormat browserCompatData={data} {locale} />
{/if}

