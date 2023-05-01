<script lang="ts">
	import type { PlaygroundSchema } from '$lib/playground/playground.schema';
	import type { BrowserCompatData } from '$lib/types/BrowserSupport.types';

	import OptionSection from '$lib/components/ui/OptionSection.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	import { getItemsFromOption } from '$lib/playground/format.utils';

	export let schema: PlaygroundSchema<'NumberFormat'>;
	export let browserCompatData: BrowserCompatData | null;
	export let onChangeOption: (event: Event) => void;
</script>

<details open>
	<summary><h2>Options</h2></summary>
	<div class="grid">
		{#each schema.options as option}
			<OptionSection
				labelId={option.name}
				header={option.name}
				{browserCompatData}
				stackedCompatView
			>
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
						{#each getItemsFromOption(schema.method, option) as [_, value]}
							<div class="radio">
								<input
									type="radio"
									on:input={onChangeOption}
									id={option.name}
									name={option.name}
									group={value}
								/>
								<label for={option.name}>{value}</label>
							</div>
						{/each}
					</fieldset>
				{/if}
			</OptionSection>
		{/each}
	</div>
</details>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	@media (min-width: 600px) {
		.grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (min-width: 900px) {
		.grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	h2 {
		font-size: 1.25rem;
		display: inline-block;
		margin: 0.5rem 0;
	}
	fieldset {
		display: flex;
		gap: 0.5rem;
		border: none;
	}
	fieldset label {
		font-weight: normal;
		margin: 0;
	}
	fieldset input {
		margin: 0;
		margin-right: 0.5rem;
	}
	.radio {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
