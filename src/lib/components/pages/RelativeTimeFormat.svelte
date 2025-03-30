<script lang="ts">
	import Highlight from "$ui/Highlight.svelte";
	import OptionSection from "$ui/OptionSection.svelte";
	import Grid from "$ui/Grid.svelte";
	import Input from "$ui/Input.svelte";
	import PageLayout from "$pages/PageLayout.svelte";
	import Spacing from "$ui/Spacing.svelte";
	import Radio from "$ui/Radio.svelte";
	import Fieldset from "$ui/Fieldset.svelte";

	import { relativeTimeFormatUnits } from "$lib/format-options/relative-time-format.options";
	import { copyCode } from "$utils/copy-to-clipboard";
	import type { OptionValues } from "$types/OptionValues.types";
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";
	import { formatLocalesForPrint, tryFormat } from "$utils/format-utils";
	import { m } from "$paraglide/messages";
	import { getAnnouncer } from "$lib/live-announcer/util";
	import { locales } from "$store/locales";

	type Props = {
		browserCompatData?: BrowserSupportDataForMethod | undefined;
	};

	let { browserCompatData = undefined }: Props = $props();

	let dayValue = $state(2);
	let style: Intl.RelativeTimeFormatStyle = $state("long");
	let numeric: "always" | "auto" = $state("auto");

	const announce = getAnnouncer();

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.RelativeTimeFormat(${formatLocalesForPrint($locales)}, ${JSON.stringify(
			Object.assign({}, options, { value: undefined })
		)}).format(${dayValue}, "${options.value}")`;
		await copyCode(code);
		announce(m.copyCodeDone());
	};

	const format = (
		options: Intl.RelativeTimeFormatOptions,
		day: number,
		value: Intl.RelativeTimeFormatUnit,
		language: string[]
	) => tryFormat(() => new Intl.RelativeTimeFormat(language, options).format(day, value));
</script>

<PageLayout>
	{#snippet input()}
		<Input id="value" fullWidth label={m.value()} bind:value={dayValue} />
		<Fieldset legend="Style">
			<Radio value="long" label="long" id="styleLong" name="style" bind:group={style} />
			<Radio value="short" label="short" id="styleShort" name="style" bind:group={style} />
			<Radio value="narrow" label="narrow" id="styleNarrow" name="style" bind:group={style} />
		</Fieldset>
		<Fieldset legend="Numeric">
			<Radio label="always" id="numericalways" name="numeric" bind:group={numeric} value="always" />
			<Radio label="auto" id="numericauto" name="numeric" bind:group={numeric} value="auto" />
		</Fieldset>
	{/snippet}
	{#snippet output()}
		<Grid>
			<OptionSection header={"unit"} support={browserCompatData?.optionsSupport?.unit}>
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
								$locales
							)}
						/>
					{/if}
				{/each}
			</OptionSection>
		</Grid>
	{/snippet}
</PageLayout>
