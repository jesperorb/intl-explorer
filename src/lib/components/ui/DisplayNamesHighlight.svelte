<script lang="ts">
	import type { OptionValues } from "$types/OptionValues.types";
	import { copyToClipboard } from "$utils/copy-to-clipboard";
	import { formatLocalesForPrint, tryDisplayNames, print } from "$utils/format-utils";
	import Highlight from "$ui/Highlight.svelte";
	import { locales } from "$store/locales";

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
