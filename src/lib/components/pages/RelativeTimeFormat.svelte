<script lang="ts">
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import PageLayout from '$lib/components/pages/PageLayout.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import Radio from '$lib/components/ui/Radio.svelte';

	import { relativeTimeFormatUnits } from '$lib/format-options/relative-time-format.options';
	import { copyCode } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';
	import { tryFormat } from '$lib/utils/format-utils';
	import Fieldset from '../ui/Fieldset.svelte';
	import { getMessages } from '$lib/i18n/util';

	export let locale: string;
	export let browserCompatData: BrowserSupportDataForMethod | null;

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.RelativeTimeFormat("${locale}", ${JSON.stringify(
			Object.assign({}, options, { value: undefined })
		)}).format(${dayValue}, "${options.value}")`;
		await copyCode(code);
	};

	const format = (
		options: Intl.RelativeTimeFormatOptions,
		day: number,
		value: Intl.RelativeTimeFormatUnit,
		language: string
	) => tryFormat(() => new Intl.RelativeTimeFormat(language, options).format(day, value));

	let dayValue = 2;
	let style: Intl.RelativeTimeFormatStyle = 'long';
	let numeric: 'always' | 'auto' = 'auto';

	const m = getMessages();
</script>

<PageLayout>
	<svelte:fragment slot="input">
		<Input id="value" fullWidth label={m.value()} bind:value={dayValue} />
		<Fieldset legend="Style">
			<Radio
				value="long"
				label="long"
				id="styleLong"
				name="style"
				bind:group={style}
			/>
			<Radio
				value="short"
				label="short"
				id="styleShort"
				name="style"
				bind:group={style}
			/>
			<Radio
				value="narrow"
				label="narrow"
				id="styleNarrow"
				name="style"
				bind:group={style}
			/>
		</Fieldset>
		<Fieldset legend="Numeric">
			<Radio 
				label="always"
				id="numericalways"
				name="numeric"
				bind:group={numeric}
				value="always"
			/>
			<Radio 
				label="auto"
				id="numericauto"
				name="numeric"
				bind:group={numeric}
				value="auto"
			/>
		</Fieldset>
	</svelte:fragment>
	<Grid slot="output">
		<OptionSection header={'unit'} support={browserCompatData?.optionsSupport?.unit}>
			{#each relativeTimeFormatUnits as value}
				{#if value !== undefined}
					<Spacing size={1} />
					<Highlight
						{onClick}
						values={{ value: value, style, numeric }}
						output={format(
							{
								style,
								numeric
							},
							dayValue,
							value,
							locale
						)}
					/>
				{/if}
			{/each}
		</OptionSection>
	</Grid>
</PageLayout>
