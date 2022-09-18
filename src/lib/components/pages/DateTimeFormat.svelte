<script lang="ts">
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';

	import {
		datetimeFormatOptions,
		getDateTimeFormatOptions
	} from '$lib/format-options/datetime-format.options';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';

	export let locale: string;

	let dateString = '2004-04-04T04:04:04';

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`new Intl.DateTimeFormat("${locale}", ${JSON.stringify(
				options
			)}).format(new Date("${dateString}"))`
		);
	};
</script>

<h2>Input values</h2>

<div>
	<label for="datetime">Date</label>
	<input type="datetime-local" id="datetime" step="1" bind:value={dateString} />
</div>

<h2>Output</h2>

<Grid>
	{#each [...datetimeFormatOptions] as [option, values]}
		<OptionSection header={option}>
			{#each values as value}
				{#if value !== undefined}
					<Highlight
						{onClick}
						values={{ [option]: value }}
						output={new Intl.DateTimeFormat(
							locale,
							getDateTimeFormatOptions(option, value)
						).format(new Date(dateString))}
					/>
				{/if}
			{/each}
		</OptionSection>
	{/each}
</Grid>

<style>
	input {
		border: 1px solid grey;
		border-radius: 4px;
		background-color: white;
		padding: 0.5rem;
	}
</style>
