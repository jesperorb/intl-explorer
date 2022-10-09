<script lang="ts">
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';

	import type { OptionValues } from '$lib/types/OptionValues.types';

	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { segmenterOptions } from '$lib/format-options/segmenter.options';
  import { languageByLocale } from '$lib/locale-data/locales';
  import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';

	let sentence = 'This is a sentence.';
	export let locale: string;
	export let browserCompatData: BrowserCompatData | null;

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`Array.from(new Intl.Segmenter("${locale}", ${JSON.stringify(
				options
			)}).segment("${sentence}"))`
		);
	};

	const getOutput = (options: OptionValues) => {
		try {
			return JSON.stringify(
				Array.from(new Intl.Segmenter(locale, options).segment(sentence))
			);
		} catch (e: unknown) {
			return 'Failed to use `Intl.Segmenter`. You are probably using an unsupported browser';
		}
	};
</script>

<h2>Input values</h2>

<Select
	name="locale"
	placeholder="Select a locale"
	label="Locale"
	removeEmpty
	items={Object.entries(languageByLocale)}
	bind:value={locale}
/>

<div>
	<Input id="list" label="List" bind:value={sentence} />
</div>

<h2>Output</h2>

<Grid>
	{#each Object.entries(segmenterOptions) as [option, values]}
		<OptionSection header={option} {browserCompatData} stackedCompatView>
			{#each values as value}
				{#if value !== undefined}
					<Highlight
						{onClick}
						values={{ [option]: value }}
						output={getOutput({ [option]: value })}
					/>
				{/if}
			{/each}
		</OptionSection>
	{/each}
</Grid>
