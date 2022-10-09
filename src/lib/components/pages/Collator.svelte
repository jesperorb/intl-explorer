<script lang="ts">
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';

	import { collatorFormatOptions } from '$lib/format-options/collator.options';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';
  import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
  import { languageByLocale } from '$lib/locale-data/locales';

	export let locale: string;
	export let browserCompatData: BrowserCompatData | null;

	let list = 'Z,a,z,ä,1,=,à';

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`[].sort(new Intl.Collator("${locale}", ${JSON.stringify(options)}).compare)`
		);
	};
</script>

<h2>Input values</h2>

<Select
	name="locale"
	placeholder="Select a locale"
	label="Locale"
	items={Object.entries(languageByLocale)}
	bind:value={locale}
/>

<div>
	<Input id="list" label="List" bind:value={list} />
</div>

<h2>Output</h2>

<Grid>
	{#each Object.entries(collatorFormatOptions) as [option, values]}
		<OptionSection header={option} {browserCompatData} stackedCompatView>
			{#each values as value}
				{#if value !== undefined}
					<Highlight
						{onClick}
						values={{ [option]: value }}
						output={list
							.split(',')
							.sort(
								new Intl.Collator(locale, {
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
