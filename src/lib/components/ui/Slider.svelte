<script lang="ts">
	import { createSlider, melt } from "@melt-ui/svelte";
	import type { ChangeFn } from "@melt-ui/svelte/internal/helpers";
	import Spacing from "./Spacing.svelte";

	export let defaultValue: number | undefined = undefined;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let step: number | undefined = undefined;
	export let onValueChange: ((value: number[]) => void) | undefined = undefined;
	export let label: string;
	export let id: string;

	const internalValueChange: ChangeFn<number[]> = (value) => {
		if (onValueChange) {
			onValueChange(value.next);
		}
		return value.next;
	};

	const {
		elements: { root, range, thumbs }
	} = createSlider({
		defaultValue: defaultValue ? [defaultValue] : undefined,
		min,
		max,
		step: step ?? 1,
		onValueChange: internalValueChange
	});
</script>

<div>
	<label for={id}>{label}</label>
	<Spacing />
	<div use:melt={$root} class="slider">
		<div class="range">
			<div use:melt={$range} />
		</div>
		<div {id} class="thumb" use:melt={$thumbs[0]} />
	</div>
</div>

<style>
	.slider {
		position: relative;
		display: flex;
		align-items: center;
		height: var(--spacing-6);
		width: 100%;
	}

	.range {
		height: var(--spacing-2);
		width: 100%;
		background: var(--text-color);
		border-radius: var(--spacing-1);
	}

	.range > div {
		height: var(--spacing-2);
		background: var(--text-color);
		border-radius: var(--spacing-1);
	}

	.thumb {
		height: var(--spacing-6);
		width: var(--spacing-6);
		border-radius: 50%;
		background: var(--background-color);
		border: 2px solid var(--border-color);
		cursor: pointer;
	}
	.thumb:focus {
		outline: 2px solid var(--focus-color);
	}
</style>
