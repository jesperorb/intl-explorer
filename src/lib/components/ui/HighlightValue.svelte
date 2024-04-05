<script lang="ts">
  import Token from "$ui/Highlight/Token.svelte";

  type Value = number | boolean | string | undefined;
  export let value: number | boolean | string | undefined;
  export let noWrap: boolean = false;
	const valueType = typeof value as "string";
  const formattedValue = (value: Value) =>
    typeof value === "string" ? `"${value}"` : value;
</script>

<Token v={`${formattedValue(value)}`} {noWrap} t={valueType} />
