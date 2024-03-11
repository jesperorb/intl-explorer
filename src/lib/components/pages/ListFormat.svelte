<script lang="ts">
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	import { listFormatOptions } from '$lib/format-options/list-format.options';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';
  import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
  import Token from '$lib/components/ui/Highlight/Token.svelte';
  import CodeBlock from '$lib/components/ui/CodeBlock.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import { trackEvent } from '$lib/utils/analytics';
	import PageLayout from './PageLayout.svelte';

	export let locale: string;
	export let browserCompatData: BrowserCompatData | null;

	const toArray = (string: string) => string.split(',');
	const toStyle = (string: string | boolean | number) => string as Intl.ListFormatStyle;

	let list = 'Miso,Sesam,Mami';

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`new Intl.ListFormat("${locale}", ${JSON.stringify(options)}).format([])`
		);
		trackEvent("Copy Code", {
			method: "ListFormat",
			options: JSON.stringify(options),
			locale,
		})
	};

	const style = listFormatOptions.style ?? [];
</script>

<PageLayout>
	<Input slot="input" id="list" label="List" bind:value={list} />
	<div slot="alternativeUse">
		<code>Intl.ListFormat</code>
		can also be used from
		<strong
			><a
				href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString"
				target="_blank"
				rel="noopener noreferrer">Array.prototype.toLocaleString()</a
			></strong
		>
	</div>
	<CodeBlock slot="alternativeCode"><Token v="["/>{#each  list.split(",") as item, i }<Token v={item} t="string" />{#if Object.keys( list.split(",")).length > 1 && i < Object.keys(list.split(",")).length - 1}<Token noTrim v=", "/>{/if}{/each}<Token v="]" /><br/>{"\t"}<Token v="." /><Token v="toLocaleString" t="function"/><Token v="(" /><Token t="string" v={`"${locale}"`} /><Token v=")" /> <br /><Token v="// " ariaHidden noTrim t="comment"/><Token v={new Intl.ListFormat(locale).format(list.split(","))} t="comment" /></CodeBlock>
	<Grid slot="output">
		{#each Object.entries(listFormatOptions) as [option, values]}
			<OptionSection header={option} {browserCompatData} stackedCompatView>
				{#each values as value}
					{#if value !== undefined}
						<Spacing size={1} />
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
					<Spacing size={1} />
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
					<Spacing size={1} />
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
					<Spacing size={1} />
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
</PageLayout>
