<script lang="ts" module>
	export interface Option {
		label: string;
		value: string;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { fly } from "svelte/transition";

	import { Combobox } from "melt/builders";
	import Spacing from "$ui/Spacing.svelte";
	import ChevronUp from "$ui/icons/ChevronUp.svelte";
	import Check from "$ui/icons/Check.svelte";
	import Chip from "$ui/Chip.svelte";

	import { m } from "$paraglide/messages";

	type Props = {
		options: Option[];
		labelText: string;
		placeholder: string;
		defaultValue?: Option[] | undefined;
		onSelect: (values?: Option[]) => void;
		onDelete: (value: string) => void;
	};

	let {
		options,
		labelText,
		placeholder,
		defaultValue = undefined,
		onSelect,
		onDelete
	}: Props = $props();

	// Create a map to maintain consistent option references
	const optionMap = new Map<string, Option>();
	options.forEach((opt) => optionMap.set(opt.value, opt));

	let isInternalDelete = false;

	const combobox = new Combobox<Option, true>({
		multiple: true,
		value: defaultValue ? new Set(defaultValue.map(v => optionMap.get(v.value) ?? v)) : undefined,
		onValueChange: (values) => {
			if (isInternalDelete) return;
			const valuesArray = values ? Array.from(values) : undefined;
			onSelect(valuesArray);
		}
	});

	const getOutput = (options: Option[], valueFromInput: string, touched: boolean) => {
		if (!touched) return options;
		const filtered = options.filter(({ label, value }) => {
			const normalizedInput = valueFromInput.toLowerCase();
			return (
				label.toLowerCase().includes(normalizedInput) ||
				value.toLowerCase().includes(normalizedInput)
			);
		});
		if (filtered.length === 0) {
			const newOption: Option = { label: valueFromInput, value: valueFromInput };
			optionMap.set(valueFromInput, newOption);
			return [newOption];
		}
		return filtered;
	};

	const internalDelete = (itemToDelete: string) => {
		const optionToDelete = optionMap.get(itemToDelete);
		if (optionToDelete && combobox.value) {
			isInternalDelete = true;
			const newValues = new Set(combobox.value);
			newValues.delete(optionToDelete);
			combobox.value = newValues as typeof combobox.value;
			isInternalDelete = false;

			// Manually call onSelect with the updated values
			onSelect(Array.from(newValues));
		}
		onDelete(itemToDelete);
	};

	let output = $derived(getOutput(options, combobox.inputValue, combobox.touched));
	let selectedValues = $derived(combobox.value ? Array.from(combobox.value) : []);

	// Custom isSelected that checks by value property instead of reference
	const isOptionSelected = (option: Option): boolean => {
		if (!combobox.value) return false;
		return Array.from(combobox.value).some((selected) => selected.value === option.value);
	};
</script>

<div class="wrapper">
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label {...combobox.label} class="label">
		<span>{labelText}</span>
	</label>
	<Spacing size={2} />
	<div class="input">
		<input {...combobox.input} {placeholder} />
		<div class="input__icon">
			<ChevronUp />
		</div>
	</div>
	{#if selectedValues.length > 0}
		<Spacing size={2} />
		<div class="chips">
			{#each selectedValues as chip}
				<Chip label={chip.value} onDelete={() => internalDelete(chip.value)} />
			{/each}
		</div>
	{/if}
</div>

<div {...combobox.content}>
	{#if combobox.content.inert === false}
		<ul transition:fly={{ duration: 150, y: -5 }}>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div tabindex="0">
				{#each output as renderOption (renderOption.value)}
					{@const optionRef = optionMap.get(renderOption.value) ?? renderOption}
					{@const isSelected = isOptionSelected(optionRef)}
					<li
						{...combobox.getOption(optionRef, renderOption.label)}
						data-disabled={renderOption.disabled}
					>
						{#if isSelected}
							<div class="item__icon">
								<Check />
							</div>
						{/if}
						<div class="item__label">
							<span>{renderOption.label}</span>
							<span class="item__value">({renderOption.value})</span>
						</div>
					</li>
				{:else}
					<li>
						{m.noResult()}
					</li>
				{/each}
			</div>
		</ul>
	{/if}
</div>

<style>
	.wrapper {
		width: 100%;
	}
	.input {
		border: 1px solid var(--border-color);
		border-radius: 4px;
		position: relative;
	}
	.input__icon {
		position: absolute;
		right: var(--spacing-2);
		top: var(--spacing-2);
		cursor: pointer;
	}
	input {
		border: none;
		width: 100%;
		padding: var(--spacing-3) var(--spacing-2);
	}
	ul {
		z-index: 50;
		display: flex;
		max-height: 300px;
		flex-direction: column;
		overflow: hidden;
		background-color: var(--background-color);
		padding: var(--spacing-1);
		border-radius: 0.25rem;
		border: 1px solid var(--border-color);
	}

	ul > div {
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		max-height: 100%;
	}

	li {
		padding: var(--spacing-2);
		padding-left: var(--spacing-7);
		scroll-margin-bottom: 0.5rem;
		scroll-margin-top: 0.5rem;
		cursor: pointer;
		position: relative;
		display: flex;
	}

	[data-highlighted] {
		background-color: var(--accent-2);
		border-radius: 2px;
	}

	.item__icon {
		position: absolute;
		left: var(--spacing-2);
		top: var(--spacing-3);
	}

	.chips {
		display: flex;
		gap: var(--spacing-2);
	}
</style>
