<script lang="ts">
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	import { collatorFormatOptions } from '$lib/format-options/collator.options';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { selectedLocale } from '$lib/store/selected-locale';
	import type { OptionValues } from '$lib/types/OptionValues.types';

	let list = 'Z,a,z,ä,1,=,à';

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`[].sort(new Intl.Collator("${selectedLocale}", ${JSON.stringify(options)}).compare)`
		);
	};
</script>

<h2>Input values</h2>

<div>
	<Input id="list" label="List" bind:value={list} />
</div>

<h2>Output</h2>

<Grid>
	{#each [...collatorFormatOptions] as [option, values]}
		<OptionSection header={option}>
			{#each values as value}
				{#if value !== undefined}
					<Highlight
						{onClick}
						values={{ [option]: value }}
						output={list
							.split(',')
							.sort(
								new Intl.Collator($selectedLocale, {
									[option]: value
								}).compare
							)
							.join(',')}
					/>
				{/if}
			{/each}
		</OptionSection>
	{/each}
</Grid>
