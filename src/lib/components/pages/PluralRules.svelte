<script lang="ts">
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';

	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';
  import { languageByLocaleAsComboBoxOptions } from '$lib/locale-data/locales';
  import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
  import { selectedLocale } from '$lib/store/selected-locale';
  import ComboBoxContext from '$lib/components/ui/ComboBox/ComboBoxContext.svelte';
  import ComboBox from '$lib/components/ui/ComboBox/ComboBox.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';

	export let locale: string;
	export let browserCompatData: BrowserCompatData | null;

	let type: Intl.PluralRuleType = 'cardinal';

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`new Intl.PluralRules("${locale}", ${JSON.stringify(
				Object.assign({}, options, { value: undefined })
			)}).select(${options.value})`
		);
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

<fieldset>
	<legend>type</legend>
	<div class="radio">
		<input type="radio" id="typeCardinal" name="type" bind:group={type} value="cardinal" />
		<label for="typeCardinal">cardinal</label>
	</div>
	<div class="radio">
		<input type="radio" id="typeOrdinal" name="type" bind:group={type} value="ordinal" />
		<label for="typeOrdinal">ordinal </label>
	</div>
</fieldset>

<Spacing />

<h2>Output</h2>

<Spacing />

<Grid>
	<OptionSection header={type} {browserCompatData} stackedCompatView>
		<Spacing size={1} />
		<Highlight
			{onClick}
			values={{
				value: 1,
				type
			}}
			output={new Intl.PluralRules(locale, {
				type
			}).select(1)}
		/>
		<Highlight
			{onClick}
			values={{
				value: 2,
				type
			}}
			output={new Intl.PluralRules(locale, {
				type
			}).select(2)}
		/>
		<Highlight
			{onClick}
			values={{
				value: 20,
				type
			}}
			output={new Intl.PluralRules(locale, {
				type
			}).select(20)}
		/>
	</OptionSection>
	<OptionSection header={'localeMatcher'}>
		<Spacing size={1} />
		<Highlight
			{onClick}
			values={{
				value: 1,
				type,
				localeMatcher: 'best fit'
			}}
			output={new Intl.PluralRules(locale, {
				type,
				localeMatcher: 'best fit'
			}).select(1)}
		/>
		<Highlight
			{onClick}
			values={{
				value: 2,
				type,
				localeMatcher: 'lookup'
			}}
			output={new Intl.PluralRules(locale, {
				type,
				localeMatcher: 'lookup'
			}).select(2)}
		/>
	</OptionSection>
</Grid>

<style>
	fieldset {
		display: inline-grid;
		grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
	}
	.radio {
		display: flex;
		gap: 0.5rem;
	}
</style>
