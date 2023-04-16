<script lang="ts">
	import Select from '$lib/components/ui/Select.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Token from '../ui/Highlight/Token.svelte';
	import CodeBlock from '../ui/CodeBlock.svelte';

	import {
		numberFormatOptionsCommon,
		numberFormatOptionsUnit
	} from '$lib/format-options/number-format.options';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	import { languageByLocale } from '$lib/locale-data/locales';
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';

	export let locale: string;
	export let browserCompatData: BrowserCompatData | null;

	let number = 123456.789;

	const options = Object.entries({ ...numberFormatOptionsUnit, ...numberFormatOptionsCommon })
		.filter(([o]) => o !== 'unit')
		.filter(([o]) => o !== 'style');

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`new Intl.NumberFormat("${locale}", ${JSON.stringify(options)}).format(${number})`
		);
	};
</script>

<h2>Input values</h2>

<Select
	name="locale"
	placeholder="Select a locale"
	label="Locale"
	removeEmpty
	items={Object.entries(languageByLocale)}
	bind:value={locale}
/>

<div>
	<Input id="amount" label="Amount" bind:value={number} />
</div>

<h2>Alternative use</h2>

<code>Intl.NumberFormat</code>
can also be used from
<strong
	><a
		href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString"
		target="_blank"
		rel="noopener noreferrer">Number.prototype.toLocaleString()</a
	></strong
>

<CodeBlock><Token noTrim v="const " t="punctuation" /><Token noTrim v="number = " /><Token t="number" v="{`${number}`}" /><br /><Token v="number" /><Token v=".toLocaleString" t="function"/><Token v="(" /><Token v="{`"${locale}"`}"  t="string" /><Token v=")" /><br/><Token v="// " ariaHidden noTrim t="comment"/><Token v={new Intl.NumberFormat(locale).format(number)} t="comment"/></CodeBlock>

<h2>Output</h2>

<Grid>
	{#each options as [option, values]}
		<OptionSection header={option} {browserCompatData} stackedCompatView>
			{#each values as value}
				{#if value !== undefined}
					<Highlight
						{onClick}
						values={{
							[option]: value
						}}
						output={new Intl.NumberFormat(locale, {
							[option]: value
						}).format(number)}
					/>
				{/if}
			{/each}
		</OptionSection>
	{/each}
</Grid>
