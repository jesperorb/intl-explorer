<script lang="ts">
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	import type { OptionValues } from '$lib/types/OptionValues.types';
  import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';

	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { segmenterOptions } from '$lib/format-options/segmenter.options';
  import { languageByLocaleAsComboBoxOptions } from '$lib/locale-data/locales';
  import ComboBoxContext from '$lib/components/ui/ComboBox/ComboBoxContext.svelte';
  import ComboBox from '$lib/components/ui/ComboBox/ComboBox.svelte';
  import { selectedLocale } from '$lib/store/selected-locale';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import { trackEvent } from '$lib/utils/analytics';

	let sentence = 'This is a sentence.';
	export let locale: string;
	export let browserCompatData: BrowserCompatData | null;

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`Array.from(new Intl.Segmenter("${locale}", ${JSON.stringify(
				options
			)}).segment("${sentence}"))`
		);
		trackEvent("Copy Code", {
			method: "Segmenter",
			options: JSON.stringify(options),
			locale,
		})
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
<Spacing />
<ComboBoxContext>
	<ComboBox
		label="Locale"
		name="locale"
		bind:value={$selectedLocale}
		options={languageByLocaleAsComboBoxOptions}
	/>
</ComboBoxContext>
<Spacing />
<div>
	<Input id="list" label="List" bind:value={sentence} />
</div>
<Spacing />
<h2>Output</h2>
<Spacing />
<Grid>
	{#each Object.entries(segmenterOptions) as [option, values]}
		<OptionSection header={option} {browserCompatData} stackedCompatView>
			{#each values as value}
				{#if value !== undefined}
					<Spacing size={1} />
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
