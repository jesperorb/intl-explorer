<script lang="ts">
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	import { listFormatOptions } from '$lib/format-options/list-format.options';
	import { copyCode } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';
	import Token from '$lib/components/ui/Highlight/Token.svelte';
	import CodeBlock from '$lib/components/ui/CodeBlock.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import PageLayout from './PageLayout.svelte';
	import { tryFormat } from '$lib/utils/format-utils';

	export let locale: string;
	export let browserCompatData: BrowserSupportDataForMethod | null;

	const toArray = (string: string) => string.split(',');
	const toStyle = (string: string | boolean | number) => string as Intl.ListFormatStyle;

	let list = 'Miso,Sesam,Mami';

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.ListFormat("${locale}", ${JSON.stringify(options)}).format([])`;
		await copyCode(code);
	};

	const style = listFormatOptions.style ?? [];

	const format = (options: Intl.ListFormatOptions, list: string, language: string) =>
		tryFormat(() => new Intl.ListFormat(language, options).format(toArray(list)));
</script>

<PageLayout>
	<Input slot="input" id="list" fullWidth label="List" bind:value={list} />
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
	<CodeBlock slot="alternativeCode"
		><Token v="[" />{#each list.split(',') as item, i}<Token
				v={item}
				t="string"
			/>{#if Object.keys(list.split(',')).length > 1 && i < Object.keys(list.split(',')).length - 1}<Token
					noTrim
					v=", "
				/>{/if}{/each}<Token v="]" /><br />{'\t'}<Token v="." /><Token
			v="toLocaleString"
			t="function"
		/><Token v="(" /><Token t="string" v={`"${locale}"`} /><Token v=")" /> <br /><Token
			v="// "
			ariaHidden
			noTrim
			t="comment"
		/><Token v={tryFormat(() => new Intl.ListFormat(locale).format(list.split(',')))} t="comment" /></CodeBlock
	>
	<Grid slot="output">
		{#each Object.entries(listFormatOptions) as [option, values]}
			<OptionSection header={option} support={browserCompatData?.optionsSupport?.[option]}>
				{#each values as value}
					{#if value !== undefined}
						<Spacing size={1} />
						<Highlight
							{onClick}
							values={{ [option]: value }}
							output={format(
								{
									[option]: value
								},
								list,
								locale
							)}
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
						output={format(
							{
								type: 'conjunction',
								style: toStyle(value)
							},
							list,
							locale
						)}
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
						output={format(
							{
								type: 'disjunction',
								style: toStyle(value)
							},
							list,
							locale
						)}
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
						output={format(
							{
								type: 'unit',
								style: toStyle(value)
							},
							list,
							locale
						)}
					/>
				{/if}
			{/each}
		</OptionSection>
	</Grid>
</PageLayout>
