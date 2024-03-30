<script lang="ts">
	import HighlightValue from '$lib/components/ui/HighlightValue.svelte';
  import CodeBlock from '$lib/components/ui/CodeBlock.svelte';
  import CopyButton from '$lib/components/ui/CopyButton.svelte';
	import Token from '$lib/components/ui/Highlight/Token.svelte';
	import { getMessages } from '$lib/i18n/util';
	type OptionValues = { [key: string]: number | boolean | string };

	const m = getMessages();

	export let values: OptionValues;
	export let output: string;
	export let onClick: (values: OptionValues) => void = () => ({});
	let internalOnClick = () => {
		onClick(values);
	};
	const formatAriaLabelForCopyButton = (values: OptionValues) => {
		const code = Object.entries(values)
			.map(([key, value]) => `${key} ${m.equals()} ${value}`)
		return m.copyCodeAriaLabel({ code });
	};
</script>

<div class="highlight">
<CodeBlock><Token v={`{`} t="punctuation" /><br />{#each Object.entries(values) as [key, value], i}{"\t"}<Token v={`${key}`} t="key"/><Token noTrim v={`: `} t="operator" /><HighlightValue noWrap {value} />{#if Object.keys(values).length > 1 && i < Object.keys(values).length - 1}<Token v={`, `} t="punctuation" /><br/>{/if}{/each}<br /><Token v={` }`} t="punctuation" /><br/><Token t="comment" ariaHidden noTrim v={"// "}/><Token t="comment" v={output} /></CodeBlock>
<CopyButton label={formatAriaLabelForCopyButton(values)} onClick={internalOnClick} />
</div>

<style>
	.highlight {
		position: relative;
	}
</style>
