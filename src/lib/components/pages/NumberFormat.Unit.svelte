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
	import { unitsAsEntries } from '$lib/locale-data/units';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	import { languageByLocale } from '$lib/locale-data/locales';
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';

	export let locale: string;
	export let browserCompatData: BrowserCompatData | null;

	let selectedUnit = 'degree';
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
	<Select
		name="unit"
		placeholder="Select a unit"
		label="Unit"
		removeEmpty
		bind:value={selectedUnit}
		items={unitsAsEntries}
	/>
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

<CodeBlock>
		<Token t="punctuation">const </Token><Token> numberToFormat =</Token>
		<Token t="number">{` ${number}`}</Token><Token>;</Token><br />
		<Token t="punctuation">const </Token><Token> formatted = numberToFormat.</Token><Token t="function">toLocaleString</Token
				><Token>(</Token><Token t="string" noWrap>"{locale}"</Token><Token>{`);`}</Token><br />
		<Token t="comment"
					><span aria-hidden="true">//</span> {new Intl.NumberFormat(locale, { style: 'unit', unit: selectedUnit }).format(
						number
					)}</Token
				>
</CodeBlock>

<h2>Output</h2>

<Grid>
	{#each options as [option, values]}
		<OptionSection header={option} {browserCompatData} stackedCompatView>
			{#each values as value}
				{#if value !== undefined}
					<Highlight
						{onClick}
						values={{
							style: 'unit',
							unit: selectedUnit,
							[option]: value
						}}
						output={new Intl.NumberFormat(locale, {
							style: 'unit',
							unit: selectedUnit,
							[option]: value
						}).format(number)}
					/>
				{/if}
			{/each}
		</OptionSection>
	{/each}
</Grid>
