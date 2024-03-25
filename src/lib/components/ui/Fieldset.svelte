<script lang="ts">
	import Spacing from "./Spacing.svelte";

  export let legend: string;
  export let role: string | undefined = undefined;
  export let name: string | undefined = undefined;
</script>

<fieldset {role} {name}>
  <legend>{legend}</legend>
  <slot />
</fieldset>

<style>
  fieldset {
    display: inline-flex;
    align-items: center;
    margin: 0;
    padding: 0;
    gap: var(--spacing-4);
    border: none;
  }
  legend {
    margin-bottom: var(--spacing-2);
  }
</style>