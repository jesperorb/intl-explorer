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
	import { m } from "$paraglide/messages";
	import { settings } from "$store/settings";
	import Skeleton from "$ui/Skeleton.svelte";

	type Props = {
		schema: PlaygroundSchema<"NumberFormat">;
		support: BrowserSupportDataForOptions | undefined;
		onChangeOption: (event: Event) => void;
		isLoadingSupportData?: boolean;
	};

	let { schema, support, onChangeOption, isLoadingSupportData = false }: Props = $props();
</script>

<h2>{m.options()}</h2>
<Spacing size={2} />
<div class="grid">
	{#each schema.options as option, index}
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
				<div class="browser-support-wrapper">
					<div
						class="browser-support-inner-wrapper"
						style="z-index: {schema.options.length - index};"
					>
						<Details>
							{#snippet summary()}
								<p>{m.browserDetails()}</p>
							{/snippet}
							<BrowserSupportGrid data={support[option.name]?.support} />
						</Details>
					</div>
				</div>
			{:else if isLoadingSupportData}
				<Spacing />
				<Skeleton />
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
	.browser-support-wrapper {
		position: relative;
		width: 100%;
		min-height: 2.5rem;
	}
	.browser-support-inner-wrapper {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
	}
</style>
