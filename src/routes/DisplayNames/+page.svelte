<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

	import BrowserSupport from '$lib/components/ui/BrowserSupport/BrowserSupport.svelte';
  import Spacing from '$lib/components/ui/Spacing.svelte';

  import { getLocaleForSSR } from '$lib/utils/get-locale';
  import { selectedLocale } from '$lib/store/selected-locale';

	import type { PageData } from './$types';
  import DisplayNames from '$lib/components/pages/DisplayNames.svelte';
	export let data: PageData;

	const locale = getLocaleForSSR($page);

</script>

<BrowserSupport {data} />
<Spacing />

{#if browser}
	<DisplayNames bind:locale={$selectedLocale} />
{:else}
	<DisplayNames {locale} />
{/if}

