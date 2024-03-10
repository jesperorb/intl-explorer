<script lang="ts">
	import Select from '$lib/components/ui/Select.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Token from '$lib/components/ui/Highlight/Token.svelte';
	import CodeBlock from '$lib/components/ui/CodeBlock.svelte';

	import { currencies } from '$lib/locale-data/currencies';
	import {
		numberFormatOptionsCommon,
		numberFormatOptionsCurrency
	} from '$lib/format-options/number-format.options';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
	import { languageByLocaleAsComboBoxOptions } from '$lib/locale-data/locales';
  import ComboBox from '$lib/components/ui/ComboBox/ComboBox.svelte';
  import ComboBoxContext from '$lib/components/ui/ComboBox/ComboBoxContext.svelte';
  import { selectedLocale } from '$lib/store/selected-locale';
	import Spacing from '$lib/components/ui/Spacing.svelte';

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
<Spacing />

<ComboBoxContext>
	<ComboBox
		label="Locale"
		name="locale"
		bind:value={$selectedLocale}
		options={languageByLocaleAsComboBoxOptions}
	/>
</ComboBoxContext>
<Spacing />

<Select
	name="currencies"
	placeholder="Select a currency"
	label="Currency"
	removeEmpty
	bind:value={selectedCurrency}
	items={Object.entries(currencies)}
/>
<Spacing />
<Input id="amount" label="Amount" bind:value={number} />
<Spacing />
<h2>Alternative use</h2>
<Spacing />
<code>Intl.NumberFormat</code>
can also be used from
<strong
	><a
		href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString"
		target="_blank"
		rel="noopener noreferrer">Number.prototype.toLocaleString()</a
	></strong
>
<Spacing size={2} />
<CodeBlock><Token noTrim v="const " t="punctuation" /><Token noTrim v="number = " /><Token t="number" v="{`${number}`}" /><br /><Token v="number" /><Token v=".toLocaleString" t="function"/><Token v="(" /><Token v="{`"${locale}"`}"  t="string" /><Token v=")" /><br/><Token v="// " ariaHidden noTrim t="comment"/><Token v={new Intl.NumberFormat(locale, { style: 'currency', currency: selectedCurrency }).format(number)} t="comment"/></CodeBlock>
<Spacing size={2} />
<h2>Output</h2>
<Spacing />
<Grid>
	{#each options as [option, values]}
		<OptionSection header={option} {browserCompatData} stackedCompatView>
			{#each values as value}
				{#if value !== undefined}
					<Spacing size={1} />
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
