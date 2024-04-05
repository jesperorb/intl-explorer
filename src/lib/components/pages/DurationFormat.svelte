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
	import { durationFormatOptions } from "$lib/format-options/duration-format.options";
	import { clampValue, formatLocalesForPrint, tryFormat } from "$utils/format-utils";
	import { locales } from "$store/locales";

	export let browserCompatData: BrowserSupportDataForMethod | null;

	let duration: Record<string, string | number> = {
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
	};

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.DurationFormat(${formatLocalesForPrint($locales)}, ${JSON.stringify(options)}).format(${JSON.stringify(duration)})`;
		await copyCode(code);
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
				{ name: target.name as any, defaultValue: "", valueType: "number", inputType: "text" },
				target.value
			) as number
		};
		duration = newDuration;
	};
</script>

<PageLayout>
	<svelte:fragment slot="input">
		<Spacing />
		{#each Object.keys(duration) as key}
			<Input id={key} name={key} label={key} {onInput} value={String(duration[key])} fullWidth />
		{/each}
	</svelte:fragment>
	<Grid slot="output">
		{#each Object.entries(durationFormatOptions) as [option, values]}
			<OptionSection header={option} support={browserCompatData?.optionsSupport?.[option]}>
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
</PageLayout>
