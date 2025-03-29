<script lang="ts">
	import CodeBlock from "$ui/CodeBlock.svelte";
	import Grid from "$ui/Grid.svelte";
	import Input from "$ui/Input.svelte";
	import HighlightValue from "$ui/HighlightValue.svelte";
	import OptionSection from "$ui/OptionSection.svelte";
	import PageLayout from "$pages/PageLayout.svelte";
	import { m } from "$paraglide/messages";
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";

	export let browserCompatData: BrowserSupportDataForMethod | undefined = undefined;

	const fallback = "ja-Jpan-JP-u-ca-japanese-hc-h12-kf-upper";

	let locale = fallback;

	const getIntl = (language: string) => {
		try {
			return new Intl.Locale(language);
		} catch (error) {
			return new Intl.Locale(fallback);
		}
	};

	$: intl = getIntl(locale);

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
	<Input id="locale" label={m.locale()} slot="input" bind:value={locale} fullWidth />
	<Grid slot="output">
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
</PageLayout>
