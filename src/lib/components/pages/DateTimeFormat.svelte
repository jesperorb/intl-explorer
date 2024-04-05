<script lang="ts">
	import Highlight from "$ui/Highlight.svelte";
	import OptionSection from "$ui/OptionSection.svelte";
	import Grid from "$ui/Grid.svelte";
	import DateTime from "$ui/DateTime.svelte";
	import Token from "$ui/Highlight/Token.svelte";
	import CodeBlock from "$ui/CodeBlock.svelte";
	import Spacing from "$ui/Spacing.svelte";
	import PageLayout from "$pages/PageLayout.svelte";
	import HighlightLocale from "$ui/Highlight/HighlightLocale.svelte";

	import {
		datetimeFormatOptions,
		getDateTimeFormatOptions
	} from "$lib/format-options/datetime-format.options";
	import { copyCode } from "$utils/copy-to-clipboard";
	import type { OptionValues } from "$types/OptionValues.types";
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";
	import { formatLocalesForPrint, tryFormat } from "$utils/format-utils";
	import { getMessages } from "$i18n/util";
	import { locales } from "$store/locales";

	export let browserCompatData: BrowserSupportDataForMethod | null;

	const m = getMessages();

	let dateTimeString = "2022-04-24T19:00";

	const onChange = (dateTime: string) => {
		dateTimeString = dateTime;
	};

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.DateTimeFormat(${formatLocalesForPrint($locales)}, ${JSON.stringify(
			options
		)}).format(new Date("${dateTimeString}"))`;
		await copyCode(code);
	};

	const format = (options: Intl.DateTimeFormatOptions, dateTime: string, language: string[]) =>
		tryFormat(() => new Intl.DateTimeFormat(language, options).format(new Date(`${dateTime}`)));
</script>

<PageLayout>
	<DateTime fullWidth slot="input" defaultValue={dateTimeString} {onChange} />
	<div slot="alternativeUse">
		{m.alternativeUseIngress({ method: "Intl.DateTimeFormat" })}
		<strong
			><a
				href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString"
				target="_blank"
				rel="noopener noreferrer">Date.prototype.toLocaleString()</a
			></strong
		>
	</div>
	<CodeBlock slot="alternativeCode">
		<Token v="new" t="punctuation" />
		<Token v="Date" t="class" />{"("}<Token v={`"${dateTimeString}"`} t="string" />{")"}
		.<Token v="toLocaleString" t="function" />{"("}<HighlightLocale
			locales={$locales}
		/>{")"}{"\n"}<Token v="// " ariaHidden noTrim t="comment" /><Token
			v={`${tryFormat(() => new Date(dateTimeString).toLocaleString($locales))}`}
			t="comment"
		/>
	</CodeBlock>
	<Grid slot="output">
		{#each Object.entries(datetimeFormatOptions) as [option, values]}
			<OptionSection header={option} support={browserCompatData?.optionsSupport?.[option]}>
				{#each values as value}
					{#if value !== undefined}
						<Spacing size={1} />
						<Highlight
							{onClick}
							values={{ [option]: value }}
							output={format(getDateTimeFormatOptions(option, value), dateTimeString, $locales)}
						/>
					{/if}
				{/each}
			</OptionSection>
		{/each}
	</Grid>
</PageLayout>
