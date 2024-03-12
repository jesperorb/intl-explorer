<script lang="ts">
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import PageLayout from '$lib/components/pages/PageLayout.svelte';
  import Spacing from '$lib/components/ui/Spacing.svelte';

	import type { OptionValues } from '$lib/types/OptionValues.types';
  import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { trackEvent } from '$lib/utils/analytics';

	export let locale: string;
	export let browserCompatData: BrowserCompatData | null;

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
