<script lang="ts">
  type Value = number | boolean | string;
  export let value: number | boolean | string;
  const formattedValue = (value: Value) =>
    typeof value === "string" ? `"${value}"` : value;
</script>

<span class={`token ${typeof value}`}>{formattedValue(value)}</span>
