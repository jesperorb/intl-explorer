<script lang="ts">
	import HighlightValue from '$lib/components/ui/HighlightValue.svelte';
  import CodeBlock from './CodeBlock.svelte';
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
	<button
		class="copy"
		aria-label="{formatAriaLabelForCopyButton(values)}"
		on:click={internalOnClick}><CopyToClipboard /></button
	>
</div>

<style>
	.highlight {
		position: relative;
		margin-bottom: 1.5rem;
	}
	.copy {
		background-color: transparent;
		border: none;
		border-top-right-radius: 0.5rem;
		border-bottom-left-radius: 0.5rem;
		padding: 1rem 1.5rem;
		cursor: pointer;
		color: var(--white);
		position: absolute;
		z-index: 1;
		top: 0;
		right: 0;
	}
	.copy:hover {
		background-color: var(--purple);
	}
</style>
