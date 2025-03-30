<script lang="ts">
	import Highlight from "$ui/Highlight.svelte";
	import OptionSection from "$ui/OptionSection.svelte";
	import Grid from "$ui/Grid.svelte";
	import Spacing from "$ui/Spacing.svelte";
	import Input from "$ui/Input.svelte";
	import PageLayout from "$pages/PageLayout.svelte";

	import { copyCode } from "$utils/copy-to-clipboard";
	import type { OptionValues } from "$types/OptionValues.types";
	import type { BrowserSupportDataForMethod } from "$types/BrowserSupport.types";
	import { durationFormatOptionsArray } from "$lib/format-options/duration-format.options";
	import { clampValue, formatLocalesForPrint, tryFormat } from "$utils/format-utils";
	import { locales } from "$store/locales";
	import { m } from "$paraglide/messages";
	import { getAnnouncer } from "$lib/live-announcer/util";

	type Props = {
		browserCompatData?: BrowserSupportDataForMethod | undefined;
	};

	let { browserCompatData = undefined }: Props = $props();

	const announce = getAnnouncer();

	let duration: Record<string, string | number> = $state({
		years: 2,
		months: 1,
		weeks: "",
		days: 46,
		hours: "",
		minutes: "",
		seconds: "",
		milliseconds: "",
		microseconds: "",
		nanoseconds: ""
	});

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.DurationFormat(${formatLocalesForPrint($locales)}, ${JSON.stringify(options)}).format(${JSON.stringify(duration)})`;
		await copyCode(code);
		announce(m.copyCodeDone());
	};

	const format = (
		options: Intl.DurationFormatOptions,
		dur: Record<string, number | string>,
		language: string[]
	) => tryFormat(() => new Intl.DurationFormat(language, options).format(dur));

	const onInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const newDuration = {
			...duration,
			[target.name]: clampValue(
				{
					name: target.name as any,
					defaultValue: undefined,
					valueType: "number",
					inputType: "text"
				},
				target.value
			) as number
		};
		duration = newDuration;
	};
</script>

<PageLayout>
	{#snippet input()}
		<Spacing />
		{#each Object.keys(duration) as key}
			<Input id={key} name={key} label={key} {onInput} value={String(duration[key])} fullWidth />
		{/each}
	{/snippet}
	{#snippet output()}
		<Grid>
			{#each durationFormatOptionsArray as [option, values], index}
				<OptionSection
					header={option}
					support={browserCompatData?.optionsSupport?.[option]}
					zIndex={durationFormatOptionsArray.length - index}
				>
					{#each values as value}
						{#if value !== undefined}
							<Spacing size={1} />
							<Highlight
								{onClick}
								values={{ [option]: value }}
								output={format({ [option]: value }, duration, $locales)}
							/>
						{/if}
					{/each}
				</OptionSection>
			{/each}
		</Grid>
	{/snippet}
</PageLayout>
