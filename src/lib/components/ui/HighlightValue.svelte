<script lang="ts">
  import Token from "./Highlight/Token.svelte";

  type Value = number | boolean | string;
  export let value: number | boolean | string;
  export let noWrap: boolean = false;
	const valueType = typeof value as any;
  const formattedValue = (value: Value) =>
    typeof value === "string" ? `"${value}"` : value;
</script>

<Token {noWrap} t={valueType}>{formattedValue(value)}</Token>
