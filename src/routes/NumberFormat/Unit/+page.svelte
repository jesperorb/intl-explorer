<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

	import NumberFormat from '$lib/components/pages/NumberFormat.Unit.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
  import Spacer from '$lib/components/ui/Spacer.svelte';

  import { selectedLocale } from '$lib/store/selected-locale';
  import { getLocaleForSSR } from '$lib/utils/get-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);
</script>

<CompatData optionsType="support" {data} />
<Spacer />

{#if browser}
	<NumberFormat browserCompatData={data} bind:locale={$selectedLocale} />
{:else}
	<NumberFormat browserCompatData={data} {locale} />
{/if}

