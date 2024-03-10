<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	import Collator from '$lib/components/pages/Collator.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
  import Spacing from '$lib/components/ui/Spacing.svelte';

	import { selectedLocale } from '$lib/store/selected-locale';
	import { getLocaleForSSR } from '$lib/utils/get-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);
</script>

<CompatData optionsType="support" {data} />
<Spacing />

{#if browser}
	<Collator browserCompatData={data} bind:locale={$selectedLocale} />
{:else}
	<Collator browserCompatData={data} {locale} />
{/if}
