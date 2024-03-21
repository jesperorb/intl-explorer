<script lang="ts">
	import type { PlaygroundSchema } from '$lib/playground/playground.schema';
	import type {
		BrowserSupportDataForOptions,
	} from '$lib/types/BrowserSupport.types';

	import Select from '$lib/components/ui/Select.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';

	import { getItemsFromOption } from '$lib/playground/format.utils';
	import OptionCard from '$lib/components/ui/OptionCard.svelte';
	import Details from '$lib/components/ui/details/Details.svelte';
	import BrowserSupportGrid from '$lib/components/ui/BrowserSupport/BrowserSupportGrid.svelte';

	export let schema: PlaygroundSchema<'NumberFormat'>;
	export let support: BrowserSupportDataForOptions | undefined;
	export let onChangeOption: (event: Event) => void;
</script>

<h2>Options</h2>
<Spacing size={2} />
<div class="grid">
	{#each schema.options as option}
		<OptionCard option={option.name} hideFullSupport support={support?.[option.name]?.coverage}>
			{#if option.inputType === 'select'}
				<Select
					onChange={onChangeOption}
					name={option.name}
					value={option.value?.toString() ?? option.defaultValue?.toString() ?? ''}
					items={getItemsFromOption(schema.method, option)}
					fullWidth
					removeEmpty={option.removeUndefined}
				/>
			{/if}
			{#if option.inputType === 'text'}
				<Input
					id={option.name}
					onInput={onChangeOption}
					name={option.name}
					value={option.value?.toString() ?? option.defaultValue?.toString() ?? ''}
					fullWidth
					pattern={option.pattern}
					max={option.max}
					min={option.min}
				/>
			{/if}
			{#if option.inputType === 'radio'}
				<fieldset>
					{#each getItemsFromOption(schema.method, option) as [value]}
						<div class="radio">
							<input
								type="radio"
								on:input={onChangeOption}
								id={option.name + value}
								name={option.name}
								group={value}
							/>
							<label for={option.name + value}>{value}</label>
						</div>
					{/each}
				</fieldset>
			{/if}
			{#if support?.[option.name]?.support}
				<Spacing />
				<Details>
					<p slot="summary">Browser details</p>
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
	h2 {
		font-size: 1.25rem;
		display: inline-block;
	}
	fieldset {
		display: flex;
		gap: 0.5rem;
		border: none;
	}
	fieldset label {
		font-weight: normal;
	}
	.radio {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
