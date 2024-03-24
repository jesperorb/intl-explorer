<script lang="ts">
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import PageLayout from '$lib/components/pages/PageLayout.svelte';

	import { copyCode } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';
	import { durationFormatOptions } from '$lib/format-options/duration-format.options';
	import { clampValue, tryFormat } from '$lib/utils/format-utils';

	export let locale: string;
	export let browserCompatData: BrowserSupportDataForMethod | null;

	let duration: Record<string, string | number> = {
		years: 2,
		months: 1,
		weeks: '',
		days: 46,
		hours: '',
		minutes: '',
		seconds: '',
		milliseconds: '',
		microseconds: '',
		nanoseconds: ''
	};

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.DurationFormat("${locale}", ${JSON.stringify(options)}).format(${JSON.stringify(duration)})`;
		await copyCode(code);
	};

	const format = (
		options: Intl.DurationFormatOptions | undefined = undefined,
		dur: Record<string, number | string>
	) => tryFormat(() => new Intl.DurationFormat(locale, options).format(dur))

	const onInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const newDuration = {
			...duration,
			[target.name]: clampValue(
				{ name: target.name as any, defaultValue: '', valueType: 'number', inputType: 'text' },
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
							output={format({ [option]: value }, duration)}
						/>
					{/if}
				{/each}
			</OptionSection>
		{/each}
	</Grid>
</PageLayout>
