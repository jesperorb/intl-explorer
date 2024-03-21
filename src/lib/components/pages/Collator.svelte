<script lang="ts">
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import PageLayout from '$lib/components/pages/PageLayout.svelte';

  import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	import { collatorFormatOptions } from '$lib/format-options/collator.options';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
  import { trackEvent } from '$lib/utils/analytics';

	export let locale: string;
	export let browserCompatData: BrowserSupportDataForMethod | null;

	let list = 'Z,a,z,ä,1,=,à';

	let onClick = async (options: OptionValues) => {
		const code = `[].sort(new Intl.Collator("${locale}", ${JSON.stringify(options)}).compare)`
		await copyToClipboard(code);
		trackEvent("Copy Code", {
			code,
		})
	};
</script>

<PageLayout>
	<Input slot="input" id="list" label="List" bind:value={list} />
	<Grid slot="output">
		{#each Object.entries(collatorFormatOptions) as [option, values]}
			<OptionSection header={option} support={browserCompatData?.optionsSupport?.[option]}>
				{#each values as value}
					{#if value !== undefined}
						<Spacing size={1} />
						<Highlight
							{onClick}
							values={{ [option]: value }}
							output={list
								.split(',')
								.sort(
									new Intl.Collator(locale, {
										[option]: value
									}).compare
								)
								.join(',')}
						/>
					{/if}
				{/each}
			</OptionSection>
		{/each}
	</Grid>
</PageLayout>


