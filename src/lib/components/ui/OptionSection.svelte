<script lang="ts">
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
	import CompatData from './CompatData.svelte';

	export let header: string;
	export let labelId: string|undefined = undefined;
	export let browserCompatData: BrowserCompatData | null = null;
	export let stackedCompatView: boolean | undefined = false;
</script>

<section data-testid={`option-section-${header}`}>
	<CompatData
		stackedView={stackedCompatView}
		option={header}
		data={browserCompatData}
		title={header}
		labelId={labelId}
		optionsType="optionsSupport"
	/>
	<slot />
</section>
