<script lang="ts">
	import { Slider } from "melt/builders";
	import Spacing from "./Spacing.svelte";

	type Props = {
		defaultValue?: number | undefined;
		min?: number | undefined;
		max?: number | undefined;
		step?: number | undefined;
		onValueChange?: ((value: number) => void) | undefined;
		label: string;
		id: string;
	};

	let {
		defaultValue = undefined,
		min = undefined,
		max = undefined,
		step = undefined,
		onValueChange = undefined,
		label,
		id
	}: Props = $props();

	const slider = new Slider({
		value: defaultValue,
		min,
		max,
		step: step ?? 1,
		onValueChange: (value) => {
			if (onValueChange) {
				onValueChange(value);
			}
		}
	});
</script>

<div>
	<label for={id}>{label}</label>
	<Spacing />
	<div {...slider.root} class="slider">
		<div class="range"></div>
		<div {...slider.thumb} {id} class="thumb"></div>
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
		position: absolute;
		height: var(--spacing-2);
		inset: 0;
		right: var(--percentage-inv);
		background: var(--text-color);
		border-radius: var(--spacing-1);
		pointer-events: none;
	}

	.thumb {
		position: absolute;
		left: var(--percentage);
		top: 50%;
		transform: translate(-50%, -50%);
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
