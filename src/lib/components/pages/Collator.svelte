<script lang="ts">
	import Grid from "$ui/Grid.svelte";
	import OptionSection from "$ui/OptionSection.svelte";
	import Highlight from "$ui/Highlight.svelte";
	import Input from "$ui/Input.svelte";
	import Spacing from "$ui/Spacing.svelte";
	import PageLayout from "$pages/PageLayout.svelte";

	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";
	import type { OptionValues } from "$types/OptionValues.types";
	import { collatorFormatOptionsArray } from "$lib/format-options/collator.options";
	import { copyCode } from "$utils/copy-to-clipboard";
	import { formatLocalesForPrint, tryFormat } from "$utils/format-utils";
	import { m } from "$paraglide/messages";
	import { locales } from "$store/locales";
	import { getAnnouncer } from "$lib/live-announcer/util";

	type Props = {
		browserCompatData?: BrowserSupportDataForMethod | undefined;
	};

	let { browserCompatData = undefined }: Props = $props();

	const announce = getAnnouncer();

	let list = $state("Z,a,z,ä,1,=,à");

	let onClick = async (options: OptionValues) => {
		const code = `[].sort(new Intl.Collator(${formatLocalesForPrint($locales)}, ${JSON.stringify(options)}).compare)`;
		await copyCode(code);
		announce(m.copyCodeDone());
	};
	const format = (options: Intl.CollatorOptions, list: string, language: string[]) =>
		tryFormat(() => list.split(",").sort(new Intl.Collator(language, options).compare).join(","));
</script>

<PageLayout>
	{#snippet input()}
		<Input id="list" fullWidth label={m.list()} bind:value={list} />
	{/snippet}
	{#snippet output()}
		<Grid>
			{#each collatorFormatOptionsArray as [option, values], index}
				<OptionSection
					header={option}
					support={browserCompatData?.optionsSupport?.[option]}
					zIndex={collatorFormatOptionsArray.length - index}
				>
					{#each values as value}
						{#if value !== undefined}
							<Spacing size={1} />
							<Highlight
								{onClick}
								values={{ [option]: value }}
								output={format(
									{
										[option]: value
									},
									list,
									$locales
								)}
							/>
						{/if}
					{/each}
				</OptionSection>
			{/each}
		</Grid>
	{/snippet}
</PageLayout>
