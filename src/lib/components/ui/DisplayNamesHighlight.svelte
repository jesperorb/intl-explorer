<script lang="ts">
	import type { OptionValues } from "$lib/types/OptionValues.types";
	import { copyToClipboard } from "$lib/utils/copy-to-clipboard";
	import { formatLocalesForPrint, tryDisplayNames, print } from "$lib/utils/format-utils";
	import Highlight from "$lib/components/ui/Highlight.svelte";
	import { locales } from "$lib/store/locales";

	export let value: string;
	export let options: OptionValues;

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`new Intl.DisplayNames(${formatLocalesForPrint($locales)}, ${print(options)}).of("${value}")`
		);
	};

	$: output = tryDisplayNames(value, $locales, options as unknown as Intl.DisplayNamesOptions);
</script>

<Highlight {onClick} values={options} {output} />
