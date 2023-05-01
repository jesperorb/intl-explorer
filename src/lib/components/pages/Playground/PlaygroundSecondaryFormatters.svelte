<script lang="ts">
	import typescript from 'svelte-highlight/languages/typescript';
	import { Highlight } from 'svelte-highlight';

	import OptionSection from '$lib/components/ui/OptionSection.svelte';

	export let secondaryFormatters: { name: string; output: string }[];
</script>

{#if secondaryFormatters.length}
	<details open id="secondaryFormatters">
		<summary>
			<h2>Secondary Formatters</h2>
		</summary>
		{#each secondaryFormatters as formatter}
			<OptionSection
				header={formatter.name}
				optionsType="formattersSupport"
				stackedCompatView
			>
				<Highlight language={typescript} code={formatter.output} />
			</OptionSection>
		{/each}
	</details>
{/if}

<style>
	h2 {
		font-size: 1.25rem;
		display: inline-block;
		margin: 0.5rem 0;
	}
</style>
