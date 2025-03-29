<script lang="ts">
	import Grid from "$ui/Grid.svelte";
	import OptionSection from "$ui/OptionSection.svelte";
	import Highlight from "$ui/Highlight.svelte";
	import Input from "$ui/Input.svelte";
	import Token from "$ui/Highlight/Token.svelte";
	import CodeBlock from "$ui/CodeBlock.svelte";
	import Spacing from "$ui/Spacing.svelte";
	import PageLayout from "$pages/PageLayout.svelte";
	import HighlightLocale from "$ui/Highlight/HighlightLocale.svelte";

	import {
		numberFormatOptionsCommon,
		numberFormatOptionsUnit
	} from "$lib/format-options/number-format.options";
	import { copyCode } from "$utils/copy-to-clipboard";
	import type { OptionValues } from "$types/OptionValues.types";
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";
	import { formatLocalesForPrint, tryFormat } from "$utils/format-utils";
	import { getMessages } from "$i18n/util";
	import { locales } from "$store/locales";
	import { getAnnouncer } from "$lib/live-announcer/util";

	export let browserCompatData: BrowserSupportDataForMethod | undefined = undefined;

	const m = getMessages();
	const announce = getAnnouncer();

	let number = 123456.789;

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
	<Input slot="input" fullWidth id="amount" label={m.amount()} bind:value={number} />
	<div slot="alternativeUse">
		{m.alternativeUseIngress({ method: "Intl.NumberFormat" })}
		<strong
			><a
				href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString"
				target="_blank"
				rel="noopener noreferrer">Number.prototype.toLocaleString()</a
			></strong
		>
	</div>
	<CodeBlock slot="alternativeCode"
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
			v={tryFormat(() => new Intl.NumberFormat($locales).format(number))}
			t="comment"
		/></CodeBlock
	>
	<Grid slot="output">
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
								[option]: value
							}}
							output={format(
								{
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
</PageLayout>
