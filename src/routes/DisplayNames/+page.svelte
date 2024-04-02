<script lang="ts">
  import DisplayNames from '$lib/components/pages/DisplayNames.svelte';
	import BrowserSupport from '$lib/components/ui/BrowserSupport/BrowserSupport.svelte';
  import Spacing from '$lib/components/ui/Spacing.svelte';
	
	import { settings } from '$lib/store/settings';

	import type { PageData } from './$types';

	export let data: PageData;

</script>

{#if $settings.showBrowserSupport}
	<BrowserSupport {data} />
	<Spacing />
{/if}

<DisplayNames />


