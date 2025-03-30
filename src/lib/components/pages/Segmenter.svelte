<script lang="ts">
	import Highlight from "$ui/Highlight.svelte";
	import OptionSection from "$ui/OptionSection.svelte";
	import Grid from "$ui/Grid.svelte";
	import Input from "$ui/Input.svelte";
	import PageLayout from "$pages/PageLayout.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import type { OptionValues } from "$types/OptionValues.types";
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";

	import { copyCode } from "$utils/copy-to-clipboard";
	import { segmenterOptionsArray } from "$lib/format-options/segmenter.options";
	import { getAnnouncer } from "$lib/live-announcer/util";
	import { tryFormat, print, formatLocalesForPrint } from "$utils/format-utils";
	import { m } from "$paraglide/messages";
	import { locales } from "$store/locales";

	type Props = {
		browserCompatData?: BrowserSupportDataForMethod | undefined;
	}

	let { browserCompatData = undefined }: Props = $props();

	const announce = getAnnouncer();

	let sentence = $state("This is a sentence.");

	let onClick = async (options: OptionValues) => {
		const code = `Array.from(new Intl.Segmenter(${formatLocalesForPrint($locales)}, ${JSON.stringify(
			options
		)}).segment("${sentence}"))`;
		await copyCode(code);
		announce(m.copyCodeDone());
	};

	const format = (options: OptionValues, input: string, language: string[]) =>
		tryFormat(() => print(Array.from(new Intl.Segmenter(language, options).segment(input))));
</script>

<PageLayout>
	{#snippet input()}
		<Input  fullWidth id="list" label={m.list()} bind:value={sentence} />
	{/snippet}
	{#snippet output()}
		<Grid >
			{#each segmenterOptionsArray as [option, values], index}
				<OptionSection
					header={option}
					support={browserCompatData?.optionsSupport?.[option]}
					zIndex={segmenterOptionsArray.length - index}
				>
					{#each values as value}
						{#if value !== undefined}
							<Spacing size={1} />
							<Highlight
								{onClick}
								values={{ [option]: value }}
								output={format({ [option]: value }, sentence, $locales)}
							/>
						{/if}
					{/each}
				</OptionSection>
			{/each}
		</Grid>
	{/snippet}
</PageLayout>
