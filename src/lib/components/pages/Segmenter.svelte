<script lang="ts">
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import PageLayout from '$lib/components/pages/PageLayout.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';

	import type { OptionValues } from '$lib/types/OptionValues.types';
	import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';

	import { copyCode } from '$lib/utils/copy-to-clipboard';
	import { segmenterOptions } from '$lib/format-options/segmenter.options';
	import { tryFormat, print } from '$lib/utils/format-utils';

	let sentence = 'This is a sentence.';
	export let locale: string;
	export let browserCompatData: BrowserSupportDataForMethod | null;

	let onClick = async (options: OptionValues) => {
		const code = `Array.from(new Intl.Segmenter("${locale}", ${JSON.stringify(
			options
		)}).segment("${sentence}"))`;
		await copyCode(code);
	};

	const format = (options: OptionValues, input: string, language: string) =>
		tryFormat(() =>
			print(Array.from(new Intl.Segmenter(language, options).segment(input)))
		);
</script>

<PageLayout>
	<Input slot="input" fullWidth id="list" label="List" bind:value={sentence} />
	<Grid slot="output">
		{#each Object.entries(segmenterOptions) as [option, values]}
			<OptionSection header={option} support={browserCompatData?.optionsSupport?.[option]}>
				{#each values as value}
					{#if value !== undefined}
						<Spacing size={1} />
						<Highlight
							{onClick}
							values={{ [option]: value }}
							output={format({ [option]: value }, sentence, locale)}
						/>
					{/if}
				{/each}
			</OptionSection>
		{/each}
	</Grid>
</PageLayout>
