<script lang="ts">
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import PageLayout from '$lib/components/pages/PageLayout.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';

	import type { OptionValues } from '$lib/types/OptionValues.types';
	import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';
	import { copyCode } from '$lib/utils/copy-to-clipboard';
	import { tryFormat } from '$lib/utils/format-utils';
	import Fieldset from '../ui/Fieldset.svelte';
	import Radio from '../ui/Radio.svelte';

	export let locale: string;
	export let browserCompatData: BrowserSupportDataForMethod | null;

	let type: Intl.PluralRuleType = 'cardinal';

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.PluralRules("${locale}", ${JSON.stringify(
			Object.assign({}, options, { value: undefined })
		)}).select(${options.value})`;
		await copyCode(code);
	};
	const format = (
		options: Intl.PluralRulesOptions,
		number: number,
		language: string
	) => tryFormat(() => new Intl.PluralRules(language, options).select(number));
</script>

<PageLayout>
	<svelte:fragment slot="input">
		<Fieldset legend="type">
			<Radio label="cardinal" id="typeCardinal" name="type" bind:group={type} value="cardinal" />
			<Radio label="ordinal" id="typeOrdinal" name="type" bind:group={type} value="ordinal" />
		</Fieldset>
	</svelte:fragment>
	<Grid slot="output">
		<OptionSection header={type} support={browserCompatData?.optionsSupport?.[type]}>
			<Spacing size={1} />
			<Highlight
				{onClick}
				values={{
					value: 1,
					type
				}}
				output={format(
					{
						type
					},
					1,
					locale
				)}
			/>
			<Highlight
				{onClick}
				values={{
					value: 2,
					type
				}}
				output={format(
					{
						type
					},
					2,
					locale
				)}
			/>
			<Highlight
				{onClick}
				values={{
					value: 20,
					type
				}}
				output={format(
					{
						type
					},
					20,
					locale
				)}
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
				output={format(
					{
						type,
						localeMatcher: 'best fit'
					},
					1,
					locale
				)}
			/>
			<Highlight
				{onClick}
				values={{
					value: 2,
					type,
					localeMatcher: 'lookup'
				}}
				output={format(
					{
						type,
						localeMatcher: 'lookup'
					},
					2,
					locale
				)}
			/>
		</OptionSection>
	</Grid>
</PageLayout>
