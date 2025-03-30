<script lang="ts">
	import Grid from "$ui/Grid.svelte";
	import OptionSection from "$ui/OptionSection.svelte";
	import Highlight from "$ui/Highlight.svelte";
	import Input from "$ui/Input.svelte";
	import HighlightLocale from "$ui/Highlight/HighlightLocale.svelte";
	import Token from "$ui/Highlight/Token.svelte";
	import CodeBlock from "$ui/CodeBlock.svelte";
	import Spacing from "$ui/Spacing.svelte";
	import PageLayout from "$pages/PageLayout.svelte";

	import type { OptionValues } from "$types/OptionValues.types";
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";
	import {
		listFormatOptions,
		listFormatOptionsArray
	} from "$lib/format-options/list-format.options";
	import { copyCode } from "$utils/copy-to-clipboard";
	import { formatLocalesForPrint, tryFormat } from "$utils/format-utils";
	import { m } from "$paraglide/messages";
	import { locales } from "$store/locales";
	import { getAnnouncer } from "$lib/live-announcer/util";

	type Props = {
		browserCompatData?: BrowserSupportDataForMethod | undefined;
	};

	let { browserCompatData = undefined }: Props = $props();

	const announce = getAnnouncer();

	const toArray = (string: string) => string.split(",");
	const toStyle = (string: string | boolean | number) => string as Intl.ListFormatStyle;

	let list = $state("Miso,Sesam,Mami");

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.ListFormat(${formatLocalesForPrint($locales)}, ${JSON.stringify(options)}).format([])`;
		await copyCode(code);
		announce(m.copyCodeDone());
	};

	const style = listFormatOptions.style ?? [];

	const format = (options: Intl.ListFormatOptions, list: string, language: string[]) =>
		tryFormat(() => new Intl.ListFormat(language, options).format(toArray(list)));
</script>

<PageLayout>
	{#snippet input()}
		<Input id="list" fullWidth label={m.list()} bind:value={list} />
	{/snippet}
	{#snippet alternativeUse()}
		<div>
			{m.alternativeUseIngress({ method: "Intl.ListFormat" })}
			<strong
				><a
					href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString"
					target="_blank"
					rel="noopener noreferrer">Array.prototype.toLocaleString()</a
				></strong
			>
		</div>
	{/snippet}
	{#snippet alternativeCode()}
		<CodeBlock
			><Token v="[" />{#each list.split(",") as item, i}<Token
					v={`"${item}"`}
					t="string"
				/>{#if Object.keys(list.split(",")).length > 1 && i < Object.keys(list.split(",")).length - 1}<Token
						noTrim
						v=", "
					/>{/if}{/each}<Token v="]" /><br />{"\t"}<Token v="." /><Token
				v="toLocaleString"
				t="function"
			/><Token v="(" /><HighlightLocale locales={$locales} /><Token v=")" /> <br /><Token
				v="// "
				ariaHidden
				noTrim
				t="comment"
			/><Token
				v={tryFormat(() => new Intl.ListFormat($locales).format(list.split(",")))}
				t="comment"
			/></CodeBlock
		>
	{/snippet}
	{#snippet output()}
		<Grid>
			{#each listFormatOptionsArray as [option, values], index}
				<OptionSection
					header={option}
					support={browserCompatData?.optionsSupport?.[option]}
					zIndex={listFormatOptionsArray.length - index}
				>
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
									$locales
								)}
							/>
						{/if}
					{/each}
				</OptionSection>
			{/each}
			<OptionSection header={"conjunction + style"}>
				{#each style as value}
					{#if value !== undefined}
						<Spacing size={1} />
						<Highlight
							values={{
								type: "conjunction",
								style: value
							}}
							output={format(
								{
									type: "conjunction",
									style: toStyle(value)
								},
								list,
								$locales
							)}
						/>
					{/if}
				{/each}
			</OptionSection>
			<OptionSection header={"disjunction + style"}>
				{#each style as value}
					{#if value !== undefined}
						<Spacing size={1} />
						<Highlight
							values={{
								type: "disjunction",
								style: value
							}}
							output={format(
								{
									type: "disjunction",
									style: toStyle(value)
								},
								list,
								$locales
							)}
						/>
					{/if}
				{/each}
			</OptionSection>
			<OptionSection header={"unit + style"}>
				{#each style as value}
					{#if value !== undefined}
						<Spacing size={1} />
						<Highlight
							values={{
								type: "unit",
								style: value
							}}
							output={format(
								{
									type: "unit",
									style: toStyle(value)
								},
								list,
								$locales
							)}
						/>
					{/if}
				{/each}
			</OptionSection>
		</Grid>
	{/snippet}
</PageLayout>
