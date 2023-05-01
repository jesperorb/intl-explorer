<script lang="ts">
	import HighlightValue from '$lib/components/ui/HighlightValue.svelte';
  import CodeBlock from './CodeBlock.svelte';
  import CopyButton from './CopyButton.svelte';
	import Token from './Highlight/Token.svelte';
  import CopyToClipboard from './icons/CopyToClipboard.svelte';
	type OptionValues = { [key: string]: number | boolean | string };

	export let values: OptionValues;
	export let output: string;
	export let onClick: (values: OptionValues) => void = () => ({});
	let internalOnClick = () => {
		onClick(values);
	};
	const formatAriaLabelForCopyButton = (values: OptionValues) => {
		const valuesAsReadbleString = Object.entries(values)
			.map(([key, value]) => `${key} equals ${value}`)
		return `Copy code for options: ${new Intl.ListFormat().format(valuesAsReadbleString)}`;
	};
</script>

<div class="highlight">
<CodeBlock><Token v={`{`} t="punctuation" /><br />{#each Object.entries(values) as [key, value], i}{"\t"}<Token v={`${key}`} t="key"/><Token noTrim v={`: `} t="operator" /><HighlightValue noWrap {value} />{#if Object.keys(values).length > 1 && i < Object.keys(values).length - 1}<Token v={`, `} t="punctuation" /><br/>{/if}{/each}<br /><Token v={` }`} t="punctuation" /><br/><Token t="comment" ariaHidden noTrim v={"// "}/><Token t="comment" v={output} /></CodeBlock>
<CopyButton label={formatAriaLabelForCopyButton(values)} onClick={internalOnClick} />
</div>

<style>
	.highlight {
		position: relative;
		margin-bottom: 1.5rem;
	}
</style>
