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
</script>

{#if href}
  <a
    {id}
    href={href}
    class="button"
    class:no-background={noBackground}
    class:uppercase={textTransform === "uppercase"}
    class:bold={bold}
    hreflang={hrefLang}>
      <slot/>
  </a>
{:else}
  <button
    on:click={onClick}
    {id}
    {type}
    class="button"
    aria-label={ariaLabel}
    aria-controls={ariaControls}
    aria-expanded={ariaExpanded}
    class:uppercase={textTransform === "uppercase"}
    class:no-background={noBackground}
    class:bold={bold}
    on:keydown={onKeyDown}
    bind:this={ref}
  >
    <slot />
  </button>
{/if}

<style>
	.button {
    background-color: var(--button-background-color);
		border: 1px solid var(--button-border-color);
    border-radius: 4px;
		padding: var(--spacing-2) var(--spacing-3);
		cursor: pointer;
		color: var(--button-text-color);
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
    color: var(--button-no-background-text-color);
  }
  .button.no-background:hover {
    background-color: transparent;
    border-color: var(--button-background-hover-color);
  }
  .button:hover {
    background-color: var(--button-background-hover-color);
  }
</style>