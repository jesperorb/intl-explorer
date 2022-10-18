<script lang="ts">
  import Token from "./Highlight/Token.svelte";

  type Value = number | boolean | string;
  export let value: number | boolean | string;
	const valueType = typeof value as any;
  const formattedValue = (value: Value) =>
    typeof value === "string" ? `"${value}"` : value;
</script>

<Token t={valueType}>{formattedValue(value)}</Token>
