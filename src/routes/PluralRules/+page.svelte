<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

	import PluralRules from '$lib/components/pages/PluralRules.svelte';
	import BrowserSupport from '$lib/components/ui/BrowserSupport/BrowserSupport.svelte';
  import Spacing from '$lib/components/ui/Spacing.svelte';

  import { getLocaleForSSR } from '$lib/utils/get-locale';
  import { selectedLocale } from '$lib/store/selected-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);

</script>

<BrowserSupport {data} />
<Spacing />

{#if browser}
	<PluralRules browserCompatData={data}  bind:locale={$selectedLocale} />
{:else}
	<PluralRules browserCompatData={data} {locale} />
{/if}

