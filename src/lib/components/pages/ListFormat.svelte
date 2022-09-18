<script lang="ts">
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	import { listFormatOptions } from '$lib/format-options/list-format.options';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';

	export let locale: string;

	const toArray = (string: string) => string.split(',');
	const toStyle = (string: string | boolean | number) => string as Intl.ListFormatStyle;

	let list = 'Miso,Sesam,Mami';

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`new Intl.ListFormat("${locale}", ${JSON.stringify(options)}).format([])`
		);
	};

	const style = listFormatOptions.get('style') ?? [];
</script>

<h2>Input values</h2>

<div>
	<Input id="list" label="List" bind:value={list} />
</div>

<h2>Output</h2>

<Grid>
	{#each [...listFormatOptions] as [option, values]}
		<OptionSection header={option}>
			{#each values as value}
				{#if value !== undefined}
					<Highlight
						{onClick}
						values={{ [option]: value }}
						output={new Intl.ListFormat(locale, {
							[option]: value
						}).format(toArray(list))}
					/>
				{/if}
			{/each}
		</OptionSection>
	{/each}
	<OptionSection header={'conjunction + style'}>
		{#each style as value}
			{#if value !== undefined}
				<Highlight
					values={{
						type: 'conjunction',
						style: value
					}}
					output={new Intl.ListFormat(locale, {
						type: 'conjunction',
						style: toStyle(value)
					}).format(toArray(list))}
				/>
			{/if}
		{/each}
	</OptionSection>
	<OptionSection header={'disjunction + style'}>
		{#each style as value}
			{#if value !== undefined}
				<Highlight
					values={{
						type: 'disjunction',
						style: value
					}}
					output={new Intl.ListFormat(locale, {
						type: 'disjunction',
						style: toStyle(value)
					}).format(toArray(list))}
				/>
			{/if}
		{/each}
	</OptionSection>
	<OptionSection header={'unit + style'}>
		{#each style as value}
			{#if value !== undefined}
				<Highlight
					values={{
						type: 'unit',
						style: value
					}}
					output={new Intl.ListFormat(locale, {
						type: 'unit',
						style: toStyle(value)
					}).format(toArray(list))}
				/>
			{/if}
		{/each}
	</OptionSection>
</Grid>
