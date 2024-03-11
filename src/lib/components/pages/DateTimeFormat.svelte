<script lang="ts">
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import DateTime from '$lib/components/ui/DateTime.svelte';
	import Token from '$lib/components/ui/Highlight/Token.svelte';
	import CodeBlock from '$lib/components/ui/CodeBlock.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import PageLayout from '$lib/components/pages/PageLayout.svelte';

	import {
		datetimeFormatOptions,
		getDateTimeFormatOptions
	} from '$lib/format-options/datetime-format.options';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
	import { trackEvent } from '$lib/utils/analytics';


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
		trackEvent("Copy Code", {
			method: "DateTimeFormat",
			options: JSON.stringify(options),
			locale,
		})
	};
</script>

<PageLayout>
	<DateTime slot="input" defaultValue={dateTimeString} {onChange} />
	<div slot="alternativeUse">
		<code>Intl.DateTimeFormat</code>
		can also be used from
		<strong
			><a
				href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString"
				target="_blank"
				rel="noopener noreferrer">Date.prototype.toLocaleString()</a
			></strong
		>
	</div>
	<CodeBlock slot="alternativeCode">
		<Token v="new" t="punctuation" /> <Token v="Date" t="class" />{"("}<Token v="{`"${dateTimeString}"`}" t="string" />{")"}
		 .<Token v="toLocaleString" t="function" />{"("}<Token v="{`"${locale}"`}" t="string" />{")"}{"\n"}<Token v="// " ariaHidden noTrim t="comment"/><Token v={`${new Date(dateTimeString).toLocaleString(locale)}`} t="comment" />
	</CodeBlock>
	<Grid slot="output">
		{#each Object.entries(datetimeFormatOptions) as [option, values]}
			<OptionSection header={option} {browserCompatData} stackedCompatView>
				{#each values as value}
					{#if value !== undefined}
						<Spacing size={1} />
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
</PageLayout>

