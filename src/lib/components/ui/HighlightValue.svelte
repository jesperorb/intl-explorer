<script lang="ts">
  import Token from "$ui/Highlight/Token.svelte";

  type Value = number | boolean | string | undefined;
  type Props = {
    value: number | boolean | string | undefined;
    noWrap?: boolean;
  }

  let { value, noWrap = false }: Props = $props();
	const valueType = typeof value as "string";
  const formattedValue = (value: Value) =>
    typeof value === "string" ? `"${value}"` : value;
</script>

<Token v={`${formattedValue(value)}`} {noWrap} t={valueType} />
