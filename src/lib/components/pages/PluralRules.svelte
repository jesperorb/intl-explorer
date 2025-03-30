<script lang="ts">
	import Grid from "$ui/Grid.svelte";
	import OptionSection from "$ui/OptionSection.svelte";
	import Highlight from "$ui/Highlight.svelte";
	import PageLayout from "$pages/PageLayout.svelte";
	import Spacing from "$ui/Spacing.svelte";
	import Fieldset from "$ui/Fieldset.svelte";
	import Radio from "$ui/Radio.svelte";

	import type { OptionValues } from "$types/OptionValues.types";
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";
	import { copyCode } from "$utils/copy-to-clipboard";
	import { formatLocalesForPrint, tryFormat } from "$utils/format-utils";
	import { locales } from "$store/locales";
	import { m } from "$paraglide/messages";
	import { getAnnouncer } from "$lib/live-announcer/util";

	type Props = {
		browserCompatData?: BrowserSupportDataForMethod | undefined;
	};

	let { browserCompatData = undefined }: Props = $props();

	let type: Intl.PluralRuleType = $state("cardinal");
	const announce = getAnnouncer();

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.PluralRules(${formatLocalesForPrint($locales)}, ${JSON.stringify(
			Object.assign({}, options, { value: undefined })
		)}).select(${options.value})`;
		await copyCode(code);
		announce(m.copyCodeDone());
	};
	const format = (options: Intl.PluralRulesOptions, number: number, language: string[]) =>
		tryFormat(() => new Intl.PluralRules(language, options).select(number));
</script>

<PageLayout>
	{#snippet input()}
		<Fieldset legend="type">
			<Radio label="cardinal" id="typeCardinal" name="type" bind:group={type} value="cardinal" />
			<Radio label="ordinal" id="typeOrdinal" name="type" bind:group={type} value="ordinal" />
		</Fieldset>
	{/snippet}
	{#snippet output()}
		<Grid>
			<OptionSection header={type} support={browserCompatData?.optionsSupport?.[type]} zIndex={2}>
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
						$locales
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
						$locales
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
						$locales
					)}
				/>
			</OptionSection>
			<OptionSection header={"localeMatcher"} zIndex={1}>
				<Spacing size={1} />
				<Highlight
					{onClick}
					values={{
						value: 1,
						type,
						localeMatcher: "best fit"
					}}
					output={format(
						{
							type,
							localeMatcher: "best fit"
						},
						1,
						$locales
					)}
				/>
				<Highlight
					{onClick}
					values={{
						value: 2,
						type,
						localeMatcher: "lookup"
					}}
					output={format(
						{
							type,
							localeMatcher: "lookup"
						},
						2,
						$locales
					)}
				/>
			</OptionSection>
		</Grid>
	{/snippet}
</PageLayout>
