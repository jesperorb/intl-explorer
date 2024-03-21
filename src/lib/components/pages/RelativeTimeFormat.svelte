<script lang="ts">
	import Highlight from '$lib/components/ui/Highlight.svelte';
	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Grid from '$lib/components/ui/Grid.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import PageLayout from '$lib/components/pages/PageLayout.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';

	import { relativeTimeFormatUnits } from '$lib/format-options/relative-time-format.options';
	import { copyToClipboard } from '$lib/utils/copy-to-clipboard';
	import type { OptionValues } from '$lib/types/OptionValues.types';
	import type { BrowserSupportDataForMethod } from '$lib/types/BrowserSupport.types';
	import { trackEvent } from '$lib/utils/analytics';

	export let locale: string;
	export let browserCompatData: BrowserSupportDataForMethod | null;

	let onClick = async (options: OptionValues) => {
		const code = `new Intl.RelativeTimeFormat("${locale}", ${JSON.stringify(
				Object.assign({}, options, { value: undefined })
			)}).format(${dayValue}, "${options.value}")`
		await copyToClipboard(code);
		trackEvent('Copy Code', {
			code,
		});
	};

	let dayValue = 2;
	let style: Intl.RelativeTimeFormatStyle = 'long';
	let numeric: 'always' | 'auto' = 'auto';
</script>

<PageLayout>
	<div slot="input">
		<div>
			<Input id="value" label="Value" bind:value={dayValue} />
		</div>
		<Spacing />
		<fieldset class="style-radio-buttons">
			<legend>Style</legend>
			<div class="radio">
				<input type="radio" id="styleLong" name="style" bind:group={style} value="long" />
				<label for="styleLong">long</label>
			</div>
			<div class="radio">
				<input type="radio" id="styleShort" name="style" bind:group={style} value="short" />
				<label for="styleShort">short </label>
			</div>
			<div class="radio">
				<input type="radio" id="styleNarrow" name="style" bind:group={style} value="narrow" />
				<label for="styleNarrow">narrow </label>
			</div>
		</fieldset>
		<Spacing />
		<div>
			<fieldset class="numeric-radio-buttons">
				<legend>Numeric</legend>
				<div class="radio">
					<input
						type="radio"
						id="numericAlways"
						name="numeric"
						bind:group={numeric}
						value="always"
					/>
					<label for="numericAlways">always</label>
					<input type="radio" id="numericAuto" name="numeric" bind:group={numeric} value="auto" />
					<label for="numericAuto">auto</label>
				</div>
			</fieldset>
		</div>
	</div>
	<Grid slot="output">
		<OptionSection header={'unit'} support={browserCompatData?.optionsSupport?.unit}>
			{#each relativeTimeFormatUnits as value}
				{#if value !== undefined}
					<Spacing size={1} />
					<Highlight
						{onClick}
						values={{ value: value, style, numeric }}
						output={new Intl.RelativeTimeFormat(locale, {
							style,
							numeric
						}).format(dayValue, value)}
					/>
				{/if}
			{/each}
		</OptionSection>
	</Grid>
</PageLayout>

<style>
	.style-radio-buttons {
		display: inline-grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
	.numeric-radio-buttons {
		display: inline-grid;
		grid-template-columns: 1fr 1fr;
	}
	.radio {
		display: flex;
		gap: 0.5rem;
	}
</style>
