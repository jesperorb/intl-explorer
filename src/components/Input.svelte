<script lang="ts">
  export let label: string;
  export let value: string | number;
  export let id: string;
</script>

<label for="amount">{label}</label>
<input type="text" bind:value {id} />

<style>
  input {
    border: 1px solid grey;
    border-radius: 4px;
    background-color: white;
    padding: 0.5rem;
  }
</style>
