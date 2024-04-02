<script lang="ts">
	import NumberFormat from '$lib/components/pages/NumberFormat.svelte';
	import BrowserSupport from '$lib/components/ui/BrowserSupport/BrowserSupport.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';

	import { getMessages } from '$lib/i18n/util';
	import { settings } from '$lib/store/settings';

	import type { PageData } from './$types';

	export let data: PageData;

	let browserCompatData = $settings.showBrowserSupport ? data : null;
	
	const m = getMessages();

</script>

{#if $settings.showBrowserSupport}
	<BrowserSupport {data} />
	<Spacing />
{/if}
<p>
	{m.seeAlso()} <a href="NumberFormat/Currency">Currency</a> {m.and()} <a href="/NumberFormat/Unit">Unit</a>.
</p>
<Spacing />
<NumberFormat {browserCompatData} />

