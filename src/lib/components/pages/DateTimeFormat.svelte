<script lang="ts">
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import DateTime from '../ui/DateTime.svelte';
	import Token from '../ui/Highlight/Token.svelte';
	import CodeBlock from '../ui/CodeBlock.svelte';
	import {
		datetimeFormatOptions,
		getDateTimeFormatOptions
	} from '$lib/format-options/datetime-format.options';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { languageByLocale } from '$lib/locale-data/locales';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';

	export let locale: string;
	export let browserCompatData: BrowserCompatData | null;

	let dateTimeString = '2022-04-24T19:00';

	const onChange = (dateTime: string) => {
		dateTimeString = dateTime;
	};

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`new Intl.DateTimeFormat("${locale}", ${JSON.stringify(
				options
			)}).format(new Date("${dateTimeString}"))`
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

<DateTime defaultValue={dateTimeString} {onChange} />

<h2>Alternative use</h2>

<code>Intl.DateTimeFormat</code>
can also be used from
<strong
	><a
		href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString"
		target="_blank"
		rel="noopener noreferrer">Date.prototype.toLocaleString()</a
	></strong
>

<CodeBlock>
	<Token t="punctuation">const </Token><Token>date = </Token><Token t="punctuation">new </Token><Token t="class">Date</Token><Token>(</Token>
	<Token t="string">"{dateTimeString}"</Token><Token>);</Token><br />
	<Token t="punctuation">const </Token><Token>formatted = date.</Token><Token t="function"
		>toLocaleString</Token
	><Token>(</Token><Token t="string">"{locale}"</Token><Token>);</Token><br />
	<Token t="comment">// {new Date(dateTimeString).toLocaleString(locale)}</Token>
</CodeBlock>

<h2>Output</h2>

<Grid>
	{#each Object.entries(datetimeFormatOptions) as [option, values]}
		<OptionSection header={option} {browserCompatData} stackedCompatView>
			{#each values as value}
				{#if value !== undefined}
					<Highlight
						{onClick}
						values={{ [option]: value }}
						output={new Intl.DateTimeFormat(locale, getDateTimeFormatOptions(option, value)).format(
							new Date(`${dateTimeString}`)
						)}
					/>
				{/if}
			{/each}
		</OptionSection>
	{/each}
</Grid>
