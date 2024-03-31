<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';

	import NumberFormat from '$lib/components/pages/NumberFormat.svelte';
	import BrowserSupport from '$lib/components/ui/BrowserSupport/BrowserSupport.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';

	import * as m from "$paraglide/messages"

  import { selectedLocale } from '$lib/store/selected-locale';
  import { getLocaleForSSR } from '$lib/utils/get-locale';

	import type { PageData } from './$types';
	import { settings } from '$lib/store/settings';
	export let data: PageData;

	const locale = getLocaleForSSR($page);
	let browserCompatData = $settings.showBrowserSupport ? data : null;

</script>

{#if $settings.showBrowserSupport}
	<BrowserSupport {data} />
	<Spacing />
{/if}
<p>
	{m.seeAlso()} <a href="NumberFormat/Currency">Currency</a> {m.and()} <a href="/NumberFormat/Unit">Unit</a>.
</p>
<Spacing />
{#if browser}
	<NumberFormat {browserCompatData} bind:locale={$selectedLocale} />
{:else}
	<NumberFormat {browserCompatData} {locale} />
{/if}

