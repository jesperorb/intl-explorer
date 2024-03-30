<script lang="ts">
	import Select from '$lib/components/ui/Select.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Token from '$lib/components/ui/Highlight/Token.svelte';
	import CodeBlock from '$lib/components/ui/CodeBlock.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import PageLayout from '$lib/components/pages/PageLayout.svelte';

	import {
		numberFormatOptionsCommon,
		numberFormatOptionsUnit
	} from '$lib/format-options/number-format.options';
	import { copyCode } from '$lib/utils/copy-to-clipboard';
	import { unitsAsEntries } from '$lib/locale-data/units';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';
	import { tryFormat } from '$lib/utils/format-utils';
	import { getMessages } from '$lib/i18n/util';

	export let locale: string;
	export let browserCompatData: BrowserSupportDataForMethod | null;

	let selectedUnit = 'degree';
	let number = 123456.789;

	const options = Object.entries({ ...numberFormatOptionsUnit, ...numberFormatOptionsCommon })
		.filter(([o]) => o !== 'unit')
		.filter(([o]) => o !== 'style');

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.NumberFormat("${locale}", ${JSON.stringify(options)}).format(${number})`;
		await copyCode(code);
	};

	const format = (
		options: Intl.NumberFormatOptions | undefined = undefined,
		number: number,
		language: string,
	) => tryFormat(() => new Intl.NumberFormat(language, options).format(number))

	const m = getMessages();
</script>

<PageLayout>
	<svelte:fragment slot="input">
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
	</svelte:fragment>
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
	<CodeBlock slot="alternativeCode"><Token noTrim v="const " t="punctuation" /><Token noTrim v="number = " /><Token t="number" v="{`${number}`}" /><br /><Token v="number" /><Token v=".toLocaleString" t="function"/><Token v="(" /><Token v="{`"${locale}"`}"  t="string" /><Token v=")" /><br/><Token v="// " ariaHidden noTrim t="comment"/><Token v={tryFormat(() => new Intl.NumberFormat(locale, { style: 'unit', unit: selectedUnit }).format(number))} t="comment"/></CodeBlock>
	<Grid slot="output">
		{#each options as [option, values]}
			<OptionSection header={option} support={browserCompatData?.optionsSupport?.[option]}>
				{#each values as value}
					{#if value !== undefined}
						<Spacing size={1} />
						<Highlight
							{onClick}
							values={{
								style: 'unit',
								unit: selectedUnit,
								[option]: value
							}}
							output={format({
								style: 'unit',
								unit: selectedUnit,
								[option]: value
							}, number, locale)}
						/>
					{/if}
				{/each}
			</OptionSection>
		{/each}
	</Grid>
</PageLayout>


