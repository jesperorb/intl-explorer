<script lang="ts">
	type Props = {
		name: string;
		id?: string | undefined;
		value: string;
		checked?: boolean | undefined;
		label: string;
		group?: string | boolean | number | undefined;
		onChange?: ((event: Event) => void) | undefined;
	}

	let {
		name,
		id = undefined,
		value,
		checked = undefined,
		label,
		group = $bindable(undefined),
		onChange = undefined
	}: Props = $props();
</script>

<label>
	<input type="radio" oninput={onChange} {name} {id} {checked} {value} bind:group={group} />
	{label}
</label>

<style>
	label {
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	input[type="radio"] {
		box-sizing: border-box;
		cursor: pointer;
		width: 20px;
		height: 20px;
		margin: 6px;
		padding: 0;
		border: 2px solid var(--border-color);
		border-radius: 50%;
		appearance: none;
		background-color: transparent;
		outline: none;
		transition: outline 0.1s;
	}
	input[type="radio"]:not(:disabled):checked {
		border-color: var(--accent-3);
		background-color: var(--accent-2);
		background-clip: content-box;
		padding: 2px;
		background-image: radial-gradient(
			circle,
			var(--accent-2) 0%,
			var(--accent-2) 50%,
			transparent 60%,
			transparent 100%
		);
	}

	input[type="radio"]:disabled {
		background-color: var(--disabled-color);
	}

	input[type="radio"]:disabled:checked {
		background-image: radial-gradient(
			circle,
			var(--border-color) 0%,
			var(--border-color) 50%,
			transparent 50%,
			transparent 100%
		);
	}

	@media (hover: hover) {
		input[type="radio"]:not(:disabled):hover {
			background-color: var(--accent-2);
			outline: 2px solid var(--focus-color);
		}
	}

	input[type="radio"]:focus-visible {
		background-color: var(--accent-2);
		outline: 2px solid var(--focus-color);
	}
	@media (prefers-reduced-motion: reduce) {
		input[type="radio"] {
			transition: none;
		}

		input[type="radio"]:focus-visible {
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) and (hover: hover) {
		input[type="radio"]:not(:disabled):hover {
			transform: scale(1);
		}
	}
</style>
