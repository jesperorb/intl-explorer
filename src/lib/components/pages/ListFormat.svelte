<script lang="ts">
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';

	import { listFormatOptions } from '$lib/format-options/list-format.options';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';
  import { languageByLocale } from '$lib/locale-data/locales';
  import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
  import Token from '../ui/Highlight/Token.svelte';
  import CodeBlock from '../ui/CodeBlock.svelte';

	export let locale: string;
	export let browserCompatData: BrowserCompatData | null;

	const toArray = (string: string) => string.split(',');
	const toStyle = (string: string | boolean | number) => string as Intl.ListFormatStyle;

	let list = 'Miso,Sesam,Mami';

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`new Intl.ListFormat("${locale}", ${JSON.stringify(options)}).format([])`
		);
	};

	const style = listFormatOptions.style ?? [];
	const splitList = list.split(",")
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
	<Input id="list" label="List" bind:value={list} />
</div>

<h2>Alternative use</h2>

<code>Intl.ListFormat</code>
can also be used from
<strong
	><a
		href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString"
		target="_blank"
		rel="noopener noreferrer">Array.prototype.toLocaleString()</a
	></strong
>

<CodeBlock>
		<Token t="punctuation">const </Token><Token>listToFormat = [</Token>
		{#each splitList as item, i }
			<Token t="string">"{item}"</Token>
			{#if Object.keys(splitList).length > 1 && i < Object.keys(splitList).length - 1}
				<Token>,</Token>
			{/if}
		{/each}
		<Token>]</Token><br/>
<Token t="punctuation">const </Token><Token> formatted = listToFormat.</Token><Token t="function">toLocaleString</Token><Token>(</Token><Token t="string" noWrap>"{locale}"</Token><Token>)</Token> <br />
<Token t="comment"><span aria-hidden="true">//</span> {new Intl.ListFormat(locale).format(list.split(","))}</Token>
</CodeBlock>

<h2>Output</h2>

<Grid>
	{#each Object.entries(listFormatOptions) as [option, values]}
		<OptionSection header={option} {browserCompatData} stackedCompatView>
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
