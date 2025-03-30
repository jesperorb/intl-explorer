<script lang="ts">
	import CodeBlock from "$ui/CodeBlock.svelte";
	import Grid from "$ui/Grid.svelte";
	import Input from "$ui/Input.svelte";
	import HighlightValue from "$ui/HighlightValue.svelte";
	import OptionSection from "$ui/OptionSection.svelte";
	import PageLayout from "$pages/PageLayout.svelte";
	import { m } from "$paraglide/messages";
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";

	type Props = {
		browserCompatData?: BrowserSupportDataForMethod | undefined;
	};

	let { browserCompatData = undefined }: Props = $props();

	const fallback = "ja-Jpan-JP-u-ca-japanese-hc-h12-kf-upper";

	let locale = $state(fallback);

	const getIntl = (language: string) => {
		try {
			return new Intl.Locale(language);
		} catch (error) {
			return new Intl.Locale(fallback);
		}
	};

	let intl = $derived(getIntl(locale));

	const properties: (keyof Intl.LocaleOptions)[] = [
		"baseName",
		"calendar",
		"region",
		"script",
		"caseFirst",
		"collation",
		"hourCycle",
		"language",
		"numberingSystem",
		"numeric"
	];
</script>

<PageLayout showLocalePicker={false}>
	{#snippet input()}
		<Input id="locale" label={m.locale()} bind:value={locale} fullWidth />
	{/snippet}
	{#snippet output()}
		<Grid>
			{#if intl}
				{#each properties as property, index}
					<OptionSection
						header={property}
						support={browserCompatData?.propertiesSupport?.[property]}
						zIndex={properties.length - index}
						hideFullSupport
					>
						<CodeBlock>
							<HighlightValue value={intl[property] ?? m.noValue()} />
						</CodeBlock>
					</OptionSection>
				{/each}
			{/if}
		</Grid>
	{/snippet}
</PageLayout>
