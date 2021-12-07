<script lang="ts">
  export let label: string;
  export let name: string;
  export let placeholder: string;
  export let items: string[][];
  export let value: string | number;
</script>

<label for={`${name}-select`}>{label}</label>
<select {name} bind:value id={`${name}-select`}>
  <option value="">{placeholder}</option>
  {#each items as [key, value]}
    <option value={key}>{value}</option>
  {/each}
</select>

<style>
  select {
    margin-bottom: 1rem;
  }
</style>
