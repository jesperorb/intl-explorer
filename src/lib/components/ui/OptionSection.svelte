<script lang="ts">
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
	import CompatData from '$lib/components/ui/CompatData.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';

	export let header: string;
	export let labelId: string | undefined = undefined;
	export let browserCompatData: BrowserCompatData | null = null;
	export let optionsType: keyof Pick<
		BrowserCompatData,
		'optionsSupport' | 'support' | 'formattersSupport'
	> = 'optionsSupport';
	export let stackedCompatView: boolean | undefined = false;
</script>

<section data-testid={`option-section-${header}`}>
	<CompatData
		stackedView={stackedCompatView}
		option={header}
		data={browserCompatData}
		title={header}
		{labelId}
		{optionsType}
	/>
	<Spacing size={1} />
	<slot />
	<Spacing size={2} />
</section>
