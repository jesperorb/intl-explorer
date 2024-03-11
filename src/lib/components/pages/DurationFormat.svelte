<script lang="ts">
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import ComboBoxContext from '$lib/components/ui/ComboBox/ComboBoxContext.svelte';
	import ComboBox from '$lib/components/ui/ComboBox/ComboBox.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import { languageByLocaleAsComboBoxOptions } from '$lib/locale-data/locales';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';
	import { selectedLocale } from '$lib/store/selected-locale';
	import { trackEvent } from '$lib/utils/analytics';
	import {
		durationFormatOptions,
	} from '$lib/format-options/duration-format.options';
	import { clampValue } from '$lib/utils/format-utils';

	export let locale: string;
	export let browserCompatData: BrowserCompatData | null;

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
	}

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`new Intl.DurationFormat("${locale}", ${JSON.stringify(options)}).format(${JSON.stringify(duration)})`
		);
		trackEvent('Copy Code', {
			method: 'DurationFormat',
			options: JSON.stringify(options),
			locale
		});
	};

	const tryFormat = (
		options: Intl.DurationFormatOptions | undefined = undefined,
		dur: Record<string, number | string>
	) => {
		try {
			return new Intl.DurationFormat(locale, options).format(dur);
		} catch (e) {
			return 'Failed to use `Intl.DurationFormat`. You are probably using an unsupported browser';
		}
	};

	const onInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const newDuration = {
			...duration,
			[target.name]: clampValue(
				{ name: target.name as any, defaultValue: "", valueType: 'number', inputType: 'text' },
				target.value
			) as number
		};
		duration = newDuration;
	};
</script>

<h2>Input values</h2>
<Spacing />

<Grid>
	{#each Object.keys(duration) as key}
		<Input
			id={key}
			name={key}
			label={key}
			{onInput}
			value={String(duration[key])}
			fullWidth
		/>
	{/each}
</Grid>
<Spacing />

<ComboBoxContext>
	<ComboBox
		label="Locale"
		name="locale"
		bind:value={$selectedLocale}
		options={languageByLocaleAsComboBoxOptions}
	/>
</ComboBoxContext>
<Spacing />
<h2>Output</h2>
<Spacing />
<Grid>
	{#each Object.entries(durationFormatOptions) as [option, values]}
		<OptionSection header={option} {browserCompatData} stackedCompatView>
			{#each values as value}
				{#if value !== undefined}
					<Spacing size={1} />
					<Highlight
						{onClick}
						values={{ [option]: value }}
						output={tryFormat({ [option]: value }, duration)}
					/>
				{/if}
			{/each}
		</OptionSection>
	{/each}
</Grid>
