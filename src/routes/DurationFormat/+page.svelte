<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

	import CompatData from '$lib/components/ui/CompatData.svelte';
  import Spacing from '$lib/components/ui/Spacing.svelte';

  import { getLocaleForSSR } from '$lib/utils/get-locale';
  import { selectedLocale } from '$lib/store/selected-locale';

	import type { PageData } from './$types';
	import DurationFormat from '$lib/components/pages/DurationFormat.svelte';
	export let data: PageData;

	const locale = getLocaleForSSR($page);

  export const ssr = false;

</script>

<CompatData {data} />
<Spacing />

{#if browser}
	<DurationFormat browserCompatData={data} bind:locale={$selectedLocale} />
{:else}
	<DurationFormat browserCompatData={data} {locale} />
{/if}

