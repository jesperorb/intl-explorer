<script lang="ts">
	import type {
    AriaAttributes,
    HTMLButtonAttributes,
    KeyboardEventHandler,
    MouseEventHandler,
  } from "svelte/elements";

	export let onClick: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
  export let onKeyDown: KeyboardEventHandler<HTMLButtonElement> | undefined = undefined;
  export let id: HTMLButtonAttributes["id"] | undefined = undefined;
  export let className: string | undefined = undefined;
  export let type: HTMLButtonAttributes["type"] | undefined = undefined;
  export let ariaLabel: AriaAttributes["aria-label"] = undefined;
  export let ariaControls: AriaAttributes["aria-controls"] = undefined;
  export let ariaExpanded: AriaAttributes["aria-expanded"] = undefined;
  export let ref: HTMLButtonElement | undefined = undefined;
  export let textTransform: "uppercase" | undefined = undefined;
  export let href: string | undefined = undefined;
  export let hrefLang: string | undefined = undefined;
</script>

{#if href}
  <a href={href} hreflang={hrefLang}><slot/></a>
{:else}
  <button
    on:click={onClick}
    {id}
    {type}
    class={className}
    aria-label={ariaLabel}
    aria-controls={ariaControls}
    aria-expanded={ariaExpanded}
    class:uppercase={textTransform === "uppercase"}
    on:keydown={onKeyDown}
    bind:this={ref}
  >
    <slot />
  </button>
{/if}

<style>
	button, a {
    background-color: inherit;
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
  button:hover, a:hover {
    background-color: var(--accent-background-color);
    border: 1px solid var(--text-color);
  }
</style>