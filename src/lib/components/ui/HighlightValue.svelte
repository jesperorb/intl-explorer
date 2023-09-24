<script lang="ts">
  import Token from "./Highlight/Token.svelte";

  type Value = number | boolean | string;
  export let value: number | boolean | string;
  export let noWrap: boolean = false;
	const valueType = typeof value as "string";
  const formattedValue = (value: Value) =>
    typeof value === "string" ? `"${value}"` : value;
</script>

<Token v={`${formattedValue(value)}`} {noWrap} t={valueType} />
