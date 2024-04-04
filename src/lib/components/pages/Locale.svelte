<script lang="ts">
	import CodeBlock from '$lib/components/ui/CodeBlock.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import HighlightValue from '$lib/components/ui/HighlightValue.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import PageLayout from '$lib/components/pages/PageLayout.svelte';
	import { getMessages } from '$lib/i18n/util';
	import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';

	export let browserCompatData: BrowserSupportDataForMethod | null;

	const fallback = 'ja-Jpan-JP-u-ca-japanese-hc-h12-kf-upper';

	let locale = fallback;

	const getIntl = (language: string) => {
		try {
			return new Intl.Locale(language);
		} catch (error) {
			return new Intl.Locale(fallback);
		}
	};

	$: intl = getIntl(locale);

	const m = getMessages();

	const properties: (keyof Intl.LocaleOptions)[] = [
		'baseName',
		'calendar',
		'region',
		'script',
		'caseFirst',
		'collation',
		'hourCycle',
		'language',
		'numberingSystem',
		'numeric'
	];
</script>

<PageLayout showLocalePicker={false}>
	<Input id="locale" label={m.locale()} slot="input" bind:value={locale} fullWidth />
	<Grid slot="output">
		{#if intl}
			{#each properties as property}
				<OptionSection
					header={property}
					support={browserCompatData?.propertiesSupport?.[property]}
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
