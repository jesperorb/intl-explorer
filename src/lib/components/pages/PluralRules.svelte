<script lang="ts">
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';

	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';

	export let locale: string;

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

<h2>Output</h2>

<Grid>
	<OptionSection header={type}>
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
	input[type='radio'] {
		margin: 0;
	}
	label {
		margin: 0;
	}
	fieldset {
		display: inline-grid;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 1rem;
    gap: 0.5rem;
	}
	.radio {
		display: flex;
		gap: 0.5rem;
	}
</style>
