<script lang="ts">
	import Segmenter from '$lib/components/pages/Segmenter.svelte';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';

	import { selectedLocale } from '$lib/store/selected-locale';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
  import { getLocaleForSSR } from '$lib/utils/get-locale';

	import type { PageData } from './$types';
	export let data: PageData;

	const locale = getLocaleForSSR($page);

</script>

<CompatData {data} />
<Spacing />

{#if browser}
	<Segmenter browserCompatData={data} bind:locale={$selectedLocale} />
{:else}
	<Segmenter browserCompatData={data} {locale} />
{/if}
