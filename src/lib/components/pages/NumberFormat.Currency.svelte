<script lang="ts">
	import Select from '$lib/components/ui/Select.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Token from '../ui/Highlight/Token.svelte';
	import CodeBlock from '../ui/CodeBlock.svelte';

	import { currencies } from '$lib/locale-data/currencies';
	import {
		numberFormatOptionsCommon,
		numberFormatOptionsCurrency
	} from '$lib/format-options/number-format.options';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
	import { languageByLocale } from '$lib/locale-data/locales';

	export let locale: string;
	export let browserCompatData: BrowserCompatData | null;

	let selectedCurrency = 'EUR';
	let number = 123456.789;

	const options = Object.entries({ ...numberFormatOptionsCurrency, ...numberFormatOptionsCommon })
		.filter(([o]) => o !== 'currency')
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
	items={Object.entries(languageByLocale)}
	bind:value={locale}
/>

<Select
	name="currencies"
	placeholder="Select a currency"
	label="Currency"
	removeEmpty
	bind:value={selectedCurrency}
	items={Object.entries(currencies)}
/>
<Input id="amount" label="Amount" bind:value={number} />

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
	<Token t="punctuation">const</Token><Token>numberToFormat =</Token>
	<Token t="number">{` ${number}`}</Token><Token>;</Token><br />
	<Token t="punctuation">const</Token><Token>formatted = numberToFormat.</Token><Token t="function"
		>toLocaleString</Token
	><Token>(</Token><Token noWrap t="string">"{locale}"</Token>
	<Token>);</Token><br />
	<Token t="comment"
		><span aria-hidden="true">//</span>
		{new Intl.NumberFormat(locale, { style: 'currency', currency: selectedCurrency }).format(
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
							[option]: value,
							style: 'currency',
							currency: selectedCurrency
						}}
						output={new Intl.NumberFormat(locale, {
							style: 'currency',
							currency: selectedCurrency,
							[option]: value
						}).format(number)}
					/>
				{/if}
			{/each}
		</OptionSection>
	{/each}
</Grid>
