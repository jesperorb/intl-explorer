<script lang="ts">
	export let name: string;
	export let id: string | undefined = undefined;
	export let value: string;
	export let checked: boolean | undefined = undefined;
	export let label: string;
	export let group: string | boolean | number | undefined = undefined;
	export let onChange: ((event: Event) => void) | undefined = undefined;
</script>

<label>
	<input type="radio" on:input={onChange} {name} {id} {checked} {value} bind:group />
	{label}
</label>

<style>
	:root {
		--radio-border-color: var(--border-color);
		--radio-checked-color: var(--radio-checked-color);
		--radio-hover-color: var(--lightergray);
		--radio-disabled-bg-color: var(--lightergray);
	}

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
		border: 2px solid var(--radio-border-color);
		border-radius: 50%;
		appearance: none;
		background-color: transparent;
		outline: none;
		transition: outline 0.1s;
	}
	input[type="radio"]:not(:disabled):checked {
		border-color: var(--radio-checked-color);
		background-color: var(--radio-checked-color);
		background-clip: content-box;
		padding: 2px;
		background-image: radial-gradient(
			circle,
			var(--radio-checked-color) 0%,
			var(--radio-checked-color) 50%,
			transparent 60%,
			transparent 100%
		);
	}

	input[type="radio"]:disabled {
		background-color: var(--radio-disabled-bg-color);
	}

	input[type="radio"]:disabled:checked {
		background-image: radial-gradient(
			circle,
			var(--radio-border-color) 0%,
			var(--radio-border-color) 50%,
			transparent 50%,
			transparent 100%
		);
	}

	@media (hover: hover) {
		input[type="radio"]:not(:disabled):hover {
			background-color: var(--radio-hover-color);
			outline: 2px solid var(--highlight);
		}
	}

	input[type="radio"]:focus-visible {
		background-color: var(--radio-hover-color);
		outline: 2px solid var(--highlight);
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
