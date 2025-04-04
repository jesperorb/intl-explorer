<script lang="ts">
	import Select from "$ui/Select.svelte";
	import Grid from "$ui/Grid.svelte";
	import OptionSection from "$ui/OptionSection.svelte";
	import Highlight from "$ui/Highlight.svelte";
	import Input from "$ui/Input.svelte";
	import Token from "$ui/Highlight/Token.svelte";
	import CodeBlock from "$ui/CodeBlock.svelte";
	import Spacing from "$ui/Spacing.svelte";
	import HighlightLocale from "$ui/Highlight/HighlightLocale.svelte";
	import PageLayout from "$pages/PageLayout.svelte";

	import {
		numberFormatOptionsCommon,
		numberFormatOptionsUnit
	} from "$lib/format-options/number-format.options";
	import { copyCode } from "$utils/copy-to-clipboard";
	import { unitsAsEntries } from "$lib/locale-data/units";
	import type { OptionValues } from "$types/OptionValues.types";
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";
	import { formatLocalesForPrint, tryFormat } from "$utils/format-utils";
	import { m } from "$paraglide/messages";
	import { locales } from "$store/locales";
	import { getAnnouncer } from "$lib/live-announcer/util";

	type Props = {
		browserCompatData?: BrowserSupportDataForMethod | undefined;
	};

	let { browserCompatData = undefined }: Props = $props();

	let selectedUnit = $state("degree");
	let number = $state(123456.789);

	const announce = getAnnouncer();

	const options = Object.entries({ ...numberFormatOptionsUnit, ...numberFormatOptionsCommon })
		.filter(([o]) => o !== "unit")
		.filter(([o]) => o !== "style");

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.NumberFormat(${formatLocalesForPrint($locales)}, ${JSON.stringify(options)}).format(${number})`;
		await copyCode(code);
		announce(m.copyCodeDone());
	};

	const format = (
		options: Intl.NumberFormatOptions | undefined = undefined,
		number: number,
		language: string[]
	) => tryFormat(() => new Intl.NumberFormat(language, options).format(number));
</script>

<PageLayout>
	{#snippet input()}
		<Select
			name="unit"
			placeholder={m.selectUnit()}
			label={m.unit()}
			removeEmpty
			fullWidth
			bind:value={selectedUnit}
			items={unitsAsEntries}
		/>
		<Input id="amount" fullWidth label={m.amount()} bind:value={number} />
	{/snippet}
	{#snippet alternativeUse()}
		<div>
			{m.alternativeUseIngress({ method: "Intl.NumberFormat" })}
			<strong
				><a
					href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString"
					target="_blank"
					rel="noopener noreferrer">Number.prototype.toLocaleString()</a
				></strong
			>
		</div>
	{/snippet}
	{#snippet alternativeCode()}
		<CodeBlock
			><Token noTrim v="const " t="punctuation" /><Token noTrim v="number = " /><Token
				t="number"
				v={`${number}`}
			/><br /><Token v="number" /><Token v=".toLocaleString" t="function" /><Token
				v="("
			/><HighlightLocale locales={$locales} /><Token v=")" /><br /><Token
				v="// "
				ariaHidden
				noTrim
				t="comment"
			/><Token
				v={tryFormat(() =>
					new Intl.NumberFormat($locales, { style: "unit", unit: selectedUnit }).format(number)
				)}
				t="comment"
			/></CodeBlock
		>
	{/snippet}
	{#snippet output()}
		<Grid>
			{#each options as [option, values], index}
				<OptionSection
					header={option}
					support={browserCompatData?.optionsSupport?.[option]}
					zIndex={options.length - index}
				>
					{#each values as value}
						{#if value !== undefined}
							<Spacing size={1} />
							<Highlight
								{onClick}
								values={{
									style: "unit",
									unit: selectedUnit,
									[option]: value
								}}
								output={format(
									{
										style: "unit",
										unit: selectedUnit,
										[option]: value
									},
									number,
									$locales
								)}
							/>
						{/if}
					{/each}
				</OptionSection>
			{/each}
		</Grid>
	{/snippet}
</PageLayout>
