<script lang="ts">
	import type {
		AriaAttributes,
		HTMLButtonAttributes,
		KeyboardEventHandler,
		MouseEventHandler
	} from "svelte/elements";

	export let onClick: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
	export let onKeyDown: KeyboardEventHandler<HTMLButtonElement> | undefined = undefined;
	export let id: HTMLButtonAttributes["id"] | undefined = undefined;
	export let type: HTMLButtonAttributes["type"] | undefined = undefined;
	export let ariaLabel: AriaAttributes["aria-label"] = undefined;
	export let ariaControls: AriaAttributes["aria-controls"] = undefined;
	export let ariaExpanded: AriaAttributes["aria-expanded"] = undefined;
	export let ref: HTMLButtonElement | undefined = undefined;
	export let textTransform: "uppercase" | undefined = undefined;
	export let href: string | undefined = undefined;
	export let hrefLang: string | undefined = undefined;
	export let noBackground: boolean | undefined = undefined;
	export let bold: boolean | undefined = undefined;
	export let title: string | undefined = undefined;
	export let disabled: boolean | null | undefined = undefined;
	export let testId: string | undefined = undefined;
</script>

{#if href}
	<a
		{id}
		{href}
		class="button"
		class:no-background={noBackground}
		class:uppercase={textTransform === "uppercase"}
		class:bold
		{title}
		data-testid={testId}
		hreflang={hrefLang}
	>
		<slot />
	</a>
{:else}
	<button
		on:click={onClick}
		{id}
		{type}
		{title}
		{disabled}
		class="button"
		aria-label={ariaLabel}
		aria-controls={ariaControls}
		aria-expanded={ariaExpanded}
		class:uppercase={textTransform === "uppercase"}
		class:no-background={noBackground}
		class:bold
		data-testid={testId}
		on:keydown={onKeyDown}
		bind:this={ref}
	>
		<slot />
	</button>
{/if}

<style>
	.button {
		background-color: var(--background-secondary-color);
		border: 1px solid var(--border-color);
		border-radius: 4px;
		padding: var(--spacing-2) var(--spacing-3);
		cursor: pointer;
		color: var(--text-color);
		text-align: center;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: inherit;
	}
	.uppercase {
		text-transform: uppercase;
	}
	.bold {
		font-weight: bold;
	}
	.no-background {
		background-color: transparent;
		border-color: transparent;
		color: var(--text-color);
	}
	.button:disabled {
		color: var(--disabled-color);
		cursor: not-allowed;
	}
	.button:not(:disabled):hover {
		filter: brightness(90%);
	}
</style>
