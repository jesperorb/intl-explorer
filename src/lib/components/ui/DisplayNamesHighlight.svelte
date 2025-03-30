<script lang="ts">
	import type { OptionValues } from "$types/OptionValues.types";
	import { copyToClipboard } from "$utils/copy-to-clipboard";
	import { formatLocalesForPrint, tryDisplayNames, print } from "$utils/format-utils";
	import Highlight from "$ui/Highlight.svelte";
	import { locales } from "$store/locales";

	type Props = {
		value: string;
		options: OptionValues;
	};

	let { value, options }: Props = $props();

	let onClick = async (options: OptionValues) => {
		await copyToClipboard(
			`new Intl.DisplayNames(${formatLocalesForPrint($locales)}, ${print(options)}).of("${value}")`
		);
	};

	let output = $derived(
		tryDisplayNames(value, $locales, options as unknown as Intl.DisplayNamesOptions)
	);
</script>

<Highlight {onClick} values={options} {output} />
