<script lang="ts">
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import PageLayout from '$lib/components/pages/PageLayout.svelte';
  import Spacing from '$lib/components/ui/Spacing.svelte';

	import type { OptionValues } from '$lib/types/OptionValues.types';
  import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { trackEvent } from '$lib/utils/analytics';

	export let locale: string;
	export let browserCompatData: BrowserSupportDataForMethod | null;

	let type: Intl.PluralRuleType = 'cardinal';

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.PluralRules("${locale}", ${JSON.stringify(
				Object.assign({}, options, { value: undefined })
			)}).select(${options.value})`;
		await copyToClipboard(code);
		trackEvent("Copy Code", {
			code,
		})
	};
	const tryFormat = (
		options: Intl.PluralRulesOptions | undefined = undefined,
		number: number
	) => {
		try {
			return new Intl.PluralRules(locale, options).select(number)
		} catch (e) {
			return 'Failed to use `Intl.PluralRules`. You are probably using an unsupported browser';
		}
	};
	
</script>

<PageLayout>
	<fieldset slot="input">
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
	<Grid slot="output">
		<OptionSection header={type} support={browserCompatData?.optionsSupport?.[type]}>
			<Spacing size={1} />
			<Highlight
				{onClick}
				values={{
					value: 1,
					type
				}}
				output={tryFormat({
					type
				}, 1)}
			/>
			<Highlight
				{onClick}
				values={{
					value: 2,
					type
				}}
				output={tryFormat({
					type
				}, 2)}
			/>
			<Highlight
				{onClick}
				values={{
					value: 20,
					type
				}}
				output={tryFormat({
					type
				}, 20)}
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
				output={tryFormat({
					type,
					localeMatcher: 'best fit'
				}, 1)}
			/>
			<Highlight
				{onClick}
				values={{
					value: 2,
					type,
					localeMatcher: 'lookup'
				}}
				output={tryFormat({
					type,
					localeMatcher: 'lookup'
				}, 2)}
			/>
		</OptionSection>
	</Grid>
</PageLayout>

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
