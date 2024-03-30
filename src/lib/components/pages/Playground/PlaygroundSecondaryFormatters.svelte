<script lang="ts">
	import { Highlight } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import type { BrowserSupportDataForOptions } from '$lib/types/BrowserSupport.types';
	import Card from '$lib/components/ui/Card.svelte';
	import { getMessages } from '$lib/i18n/util';
	
	export let secondaryFormatters: { name: string; output: string }[];
	export let support: BrowserSupportDataForOptions | undefined = undefined;
	const m = getMessages();
</script>

{#if secondaryFormatters.length}
	<h2>{m.secondaryFormatters()}</h2>
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

