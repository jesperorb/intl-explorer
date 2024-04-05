<script lang="ts">
	import type { PlaygroundSchema } from "$lib/playground/playground.schema";
	import type { BrowserSupportDataForOptions } from "$types/BrowserSupport.types";

	import Select from "$ui/Select.svelte";
	import Input from "$ui/Input.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import { getItemsFromOption } from "$lib/playground/format.utils";
	import OptionCard from "$ui/OptionCard.svelte";
	import Details from "$ui/details/Details.svelte";
	import BrowserSupportGrid from "$ui/BrowserSupport/BrowserSupportGrid.svelte";
	import Radio from "$ui/Radio.svelte";
	import { optionIsActive } from "$lib/playground/validate";
	import { getMessages } from "$i18n/util";
	import { settings } from "$store/settings";

	export let schema: PlaygroundSchema<"NumberFormat">;
	export let support: BrowserSupportDataForOptions | undefined;
	export let onChangeOption: (event: Event) => void;
	const m = getMessages();
</script>

<h2>{m.options()}</h2>
<Spacing size={2} />
<div class="grid">
	{#each schema.options as option}
		<OptionCard
			checked={optionIsActive(option)}
			option={option.name}
			onChange={onChangeOption}
			hideFullSupport
			support={$settings.showBrowserSupport ? support?.[option.name]?.coverage : undefined}
		>
			{#if option.inputType === "select"}
				<Select
					onChange={onChangeOption}
					name={option.name}
					value={option.value?.toString() ?? option.defaultValue?.toString() ?? ""}
					items={getItemsFromOption(schema.method, option)}
					fullWidth
					removeEmpty={option.removeUndefined}
				/>
			{/if}
			{#if option.inputType === "text"}
				<Input
					id={option.name}
					onInput={onChangeOption}
					name={option.name}
					value={option.value?.toString() ?? option.defaultValue?.toString() ?? ""}
					fullWidth
					pattern={option.pattern}
					max={option.max}
					min={option.min}
				/>
			{/if}
			{#if option.inputType === "radio"}
				<div class="radios" role="radiogroup">
					{#each getItemsFromOption(schema.method, option) as [value]}
						<Radio
							value={value?.toString() ?? "undefined"}
							name={option.name}
							id={option.name + value?.toString()}
							onChange={onChangeOption}
							label={value?.toString() ?? "undefined"}
							checked={value === option.value}
						/>
					{/each}
				</div>
			{/if}
			{#if support?.[option.name]?.support && $settings.showBrowserSupport}
				<Spacing />
				<Details>
					<p slot="summary">{m.browserDetails()}</p>
					<BrowserSupportGrid data={support[option.name]?.support} />
				</Details>
			{/if}
		</OptionCard>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	@media (min-width: 1200px) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	.radios {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
	}
</style>
