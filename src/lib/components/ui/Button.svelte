<script lang="ts">
	import type {
		AriaAttributes,
		HTMLButtonAttributes,
		KeyboardEventHandler,
		MouseEventHandler
	} from "svelte/elements";

	type Props = {
		onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
		onKeyDown?: KeyboardEventHandler<HTMLButtonElement> | undefined;
		id?: HTMLButtonAttributes["id"] | undefined;
		type?: HTMLButtonAttributes["type"] | undefined;
		ariaLabel?: AriaAttributes["aria-label"];
		ariaControls?: AriaAttributes["aria-controls"];
		ariaExpanded?: AriaAttributes["aria-expanded"];
		ref?: HTMLButtonElement | undefined;
		textTransform?: "uppercase" | undefined;
		href?: string | undefined;
		hrefLang?: string | undefined;
		noBackground?: boolean | undefined;
		bold?: boolean | undefined;
		title?: string | undefined;
		disabled?: boolean | null | undefined;
		testId?: string | undefined;
		children?: import('svelte').Snippet;
	}

	let {
		onClick = undefined,
		onKeyDown = undefined,
		id = undefined,
		type = undefined,
		ariaLabel = undefined,
		ariaControls = undefined,
		ariaExpanded = undefined,
		ref = $bindable(undefined),
		textTransform = undefined,
		href = undefined,
		hrefLang = undefined,
		noBackground = undefined,
		bold = undefined,
		title = undefined,
		disabled = undefined,
		testId = undefined,
		children
	}: Props = $props();
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
		{@render children?.()}
	</a>
{:else}
	<button
		onclick={onClick}
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
		onkeydown={onKeyDown}
		bind:this={ref}
	>
		{@render children?.()}
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
