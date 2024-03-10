<script lang="ts">
	import typescript from 'svelte-highlight/languages/typescript';
	import { Highlight } from 'svelte-highlight';

	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
	import Spacing from '$lib/components/ui/Spacing.svelte';

	export let secondaryFormatters: { name: string; output: string }[];
	export let browserCompatData: BrowserCompatData | null;
</script>

{#if secondaryFormatters.length}
	<h2>Secondary Formatters</h2>
	<Spacing size={2} />
	{#each secondaryFormatters as formatter}
		<OptionSection
			header={formatter.name}
			optionsType="formattersSupport"
			bind:browserCompatData
			stackedCompatView
		>
			<Spacing size={1} />
			<Highlight language={typescript} code={formatter.output} />
		</OptionSection>
		<Spacing />
	{/each}
{/if}

<style>
	h2 {
		font-size: 1.25rem;
		display: inline-block;
	}
</style>
