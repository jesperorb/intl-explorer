<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

	import PluralRules from '$lib/components/pages/PluralRules.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
  import Spacing from '$lib/components/ui/Spacing.svelte';

  import { getLocaleForSSR } from '$lib/utils/get-locale';
  import { selectedLocale } from '$lib/store/selected-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);

</script>

<CompatData {data} />
<Spacing />

{#if browser}
	<PluralRules browserCompatData={data}  bind:locale={$selectedLocale} />
{:else}
	<PluralRules browserCompatData={data} {locale} />
{/if}

