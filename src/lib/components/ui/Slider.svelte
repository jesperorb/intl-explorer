<script lang="ts">
  import { createSlider, melt } from '@melt-ui/svelte';
	import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
	import Button from './Button.svelte';
	import Spacing from './Spacing.svelte';

  export let defaultValue: number | undefined = undefined;
  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;
  export let step: number | undefined = undefined;
  export let onValueChange: ((value: number[]) => void) | undefined = undefined;

  const internalValueChange: ChangeFn<number[]> = (value) => {
    if(onValueChange) {
      onValueChange(value.next);
    }
    return value.next;
  }

  const {
    elements: { root, range, thumbs },
  } = createSlider({
    defaultValue: defaultValue ? [defaultValue] : undefined,
    min,
    max,
    step: step ?? 1,
    onValueChange: internalValueChange,
  });
</script>

<span use:melt={$root} class="slider">
  <span class="range">
    <span use:melt={$range} />
  </span>
  <span
    use:melt={$thumbs[0]}
    class="thumb"
  />
</span>

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

  .range > span {
    height: var(--spacing-2);
    background: var(--text-color);
    border-radius: var(--spacing-1);
  }

  .thumb {
    height: var(--spacing-6);
    width: var(--spacing-6);
    border-radius: 50%;
    background: var(--background-color);
    border: 1px solid var(--border-color);
    cursor: pointer;
  }
  .thumb:focus {
    outline: 2px solid var(--focus-color);
  }
</style>
