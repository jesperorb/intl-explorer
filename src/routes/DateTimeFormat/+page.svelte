<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

	import DateTimeFormat from '$lib/components/pages/DateTimeFormat.svelte';
	import BrowserSupport from '$lib/components/ui/BrowserSupport/BrowserSupport.svelte';
  import Spacing from '$lib/components/ui/Spacing.svelte';

  import { selectedLocale } from '$lib/store/selected-locale';
  import { getLocaleForSSR } from '$lib/utils/get-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);

</script>

<BrowserSupport {data} />
<Spacing />

{#if browser}
	<DateTimeFormat browserCompatData={data}  bind:locale={$selectedLocale} />
{:else}
	<DateTimeFormat browserCompatData={data} {locale} />
{/if}

