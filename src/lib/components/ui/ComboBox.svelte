<script lang="ts" context="module">
	export interface Option {
		label: string;
		value: string;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { fly } from "svelte/transition";

	import { createCombobox, melt } from "@melt-ui/svelte";
	import Spacing from "$ui/Spacing.svelte";
	import ChevronUp from "$ui/icons/ChevronUp.svelte";
	import Check from "$ui/icons/Check.svelte";
	import Chip from "$ui/Chip.svelte";

	import { getMessages } from "$i18n/util";

	const m = getMessages();

	export let options: Option[];
	export let labelText: string;
	export let placeholder: string;
	export let defaultValue: Option[] | undefined = undefined;
	export let onSelect: (values?: Option[]) => void;
	export let onDelete: (value: string) => void;

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected }
	} = createCombobox<Option, true>({
		forceVisible: true,
		multiple: true,
		closeOnEscape: true,
		defaultSelected: defaultValue?.map((v) => ({ value: v })),
		closeOnOutsideClick: true,
		onSelectedChange: (args) => {
			onSelect(args.next?.map((v) => v.value) as Option[] | undefined);
			return args.next;
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
		return filtered.length === 0 ? [{ label: valueFromInput, value: valueFromInput }] : filtered;
	};

	const internalDelete = (itemToDelete: string) => {
		selected.update((value) => value?.filter((v) => v.value.value !== itemToDelete));
		onDelete(itemToDelete);
	};

	$: output = getOutput(options, $inputValue, $touchedInput);
</script>

<div class="wrapper">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label use:melt={$label} class="label">
		<span>{labelText}</span>
	</label>
	<Spacing size={2} />
	<div class="input">
		<input use:melt={$input} {placeholder} />
		<div class="input__icon">
			{#if $open}
				<ChevronUp />
			{:else}
				<ChevronUp />
			{/if}
		</div>
	</div>
	{#if $selected}
		<Spacing size={2} />
		<div class="chips">
			{#each $selected as chip}
				<Chip label={chip.value.value} onDelete={() => internalDelete(chip.value.value)} />
			{/each}
		</div>
	{/if}
</div>

{#if $open}
	<ul use:melt={$menu} transition:fly={{ duration: 150, y: -5 }}>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div tabindex="0">
			{#each output as renderOption}
				<li
					use:melt={$option({
						value: renderOption,
						label: renderOption.label,
						disabled: renderOption.disabled
					})}
				>
					{#if $isSelected(renderOption)}
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
		z-index: 1;
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
