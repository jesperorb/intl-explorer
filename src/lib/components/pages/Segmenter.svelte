<script lang="ts">
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import PageLayout from '$lib/components/pages/PageLayout.svelte';
  import Spacing from '$lib/components/ui/Spacing.svelte';

	import type { OptionValues } from '$lib/types/OptionValues.types';
  import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';

	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { segmenterOptions } from '$lib/format-options/segmenter.options';
	import { trackEvent } from '$lib/utils/analytics';

	let sentence = 'This is a sentence.';
	export let locale: string;
	export let browserCompatData: BrowserSupportDataForMethod | null;

	let onClick = async (options: OptionValues) => {
		const code = `Array.from(new Intl.Segmenter("${locale}", ${JSON.stringify(
				options
			)}).segment("${sentence}"))`;
		await copyToClipboard(code);
		trackEvent("Copy Code", {
			code,
		})
	};

	const getOutput = (options: OptionValues) => {
		try {
			return JSON.stringify(
				Array.from(new Intl.Segmenter(locale, options).segment(sentence))
			);
		} catch (e: unknown) {
			return 'Failed to use `Intl.Segmenter`. You are probably using an unsupported browser';
		}
	};
</script>

<PageLayout>
	<Input slot="input" id="list" label="List" bind:value={sentence} />
	<Grid slot="output">
		{#each Object.entries(segmenterOptions) as [option, values]}
			<OptionSection header={option} support={browserCompatData?.optionsSupport?.[option]}>
				{#each values as value}
					{#if value !== undefined}
						<Spacing size={1} />
						<Highlight
							{onClick}
							values={{ [option]: value }}
							output={getOutput({ [option]: value })}
						/>
					{/if}
				{/each}
			</OptionSection>
		{/each}
	</Grid>
</PageLayout>

