<script lang="ts">
	import { Highlight } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import type { BrowserSupportDataForOptions } from '$lib/types/BrowserSupport.types';
	import Card from '$lib/components/ui/Card.svelte';

	export let secondaryFormatters: { name: string; output: string }[];
	export let support: BrowserSupportDataForOptions | undefined = undefined;
</script>

{#if secondaryFormatters.length}
	<h2>Secondary Formatters</h2>
	<Spacing />
	{#each secondaryFormatters as formatter}
	<Card>
		<OptionSection header={formatter.name} support={support?.[formatter.name]} hideFullSupport={false}>
			<Spacing />
			<Highlight language={typescript} code={formatter.output} />
		</OptionSection>
	</Card>
	<Spacing />
	{/each}
{/if}

<style>
	h2 {
		font-size: 1.25rem;
		display: inline-block;
	}
</style>
