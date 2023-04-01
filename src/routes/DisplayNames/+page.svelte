<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

	import CompatData from '$lib/components/ui/CompatData.svelte';
  import Spacer from '$lib/components/ui/Spacer.svelte';

  import { getLocaleForSSR } from '$lib/utils/get-locale';
  import { selectedLocale } from '$lib/store/selected-locale';

	import type { PageData } from './$types';
  import DisplayNames from '$lib/components/pages/DisplayNames.svelte';
	export let data: PageData;

	const locale = getLocaleForSSR($page);

</script>

<CompatData optionsType="support" {data} />
<Spacer />

{#if browser}
	<DisplayNames bind:locale={$selectedLocale} />
{:else}
	<DisplayNames {locale} />
{/if}

