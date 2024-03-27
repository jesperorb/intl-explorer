<script lang="ts">
	import { browser } from '$app/environment';
	import { settings } from '$lib/store/settings';
	import SrOnly from './SrOnly.svelte';
  import Moon from './icons/Moon.svelte';
	import Sun from './icons/Sun.svelte';

  let checked = Boolean(
		browser
			? $settings.theme === "dark"
			: false
	);

	const change = (event: Event) => {
		const target = event.target as HTMLInputElement;
		settings.update((s) => ({
			...s,
			theme: target.checked ? "dark" : "light",
		}))
	};
</script>

<div>
	<input type="checkbox" on:change={change} bind:checked class="checkbox" id="darkModeToggle" />
	<label for="darkModeToggle" class="checkbox-label">
		<Moon />
		<Sun />
		<span class="ball"></span>
    <SrOnly>
      Toggle Dark Mode
    </SrOnly>
	</label>
</div>

<style>
	.checkbox {
		opacity: 0;
		position: absolute;
	}

	.checkbox-label {
		background-color: var(--text-color);
		width: 50px;
		height: 26px;
		border-radius: 50px;
		position: relative;
		padding: 5px;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.checkbox-label .ball {
		background-color: var(--background-color);
		width: 22px;
		height: 22px;
		position: absolute;
		left: 2px;
		top: 2px;
		border-radius: 50%;
		transition: transform 0.2s linear;
	}

	.checkbox:checked + .checkbox-label .ball {
		transform: translateX(24px);
	}

	.checkbox:focus + .checkbox-label {
		box-shadow: 0px 0px 2px var(--highlight);
		outline: 1px solid var(--highlight);
	}
</style>
