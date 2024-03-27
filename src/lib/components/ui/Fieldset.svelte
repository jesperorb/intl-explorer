<script lang="ts">
  export let legend: string;
  export let role: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let capitalize: boolean = false;
</script>

<fieldset {role} {name}>
  <legend class:capitalize={capitalize}>{legend}</legend>
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
  .capitalize {
    text-transform: capitalize;
  }
</style>