<script lang="ts">
  import type { OptionValues } from "$lib/types/OptionValues.types";
  import { copyToClipboard } from "$lib/utils/copy-to-clipboard";
  import { tryDisplayNames } from "$lib/utils/format-utils";
  import Highlight from "$lib/components/ui/Highlight.svelte";

  export let value: string;
  export let locale: string;
  export let options: OptionValues;

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(`new Intl.DisplayNames("${locale}", ${JSON.stringify(options, null, 2)}).of("${value}")`);
	};

  $: output = tryDisplayNames(value, locale, options as unknown as Intl.DisplayNamesOptions);

</script>
<Highlight
  {onClick}
  values={options}
  {output}
/>