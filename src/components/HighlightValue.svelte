<script lang="ts">
  type Value = number | boolean | string;
  export let value: number | boolean | string;
  const formattedValue = (value: Value) =>
    typeof value === "string" ? `"${value}"` : value;
</script>

<span class={`token ${typeof value}`}>{formattedValue(value)}</span>

<style>
  .token.boolean {
    color: rgb(255, 88, 116);
  }

  .token.number {
    color: rgb(247, 140, 108);
  }

  .token.string {
    color: rgb(173, 219, 103);
  }
</style>
