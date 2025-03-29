<script lang="ts">
	import HighlightValue from '$ui/HighlightValue.svelte';
  import CodeBlock from '$ui/CodeBlock.svelte';
	import Token from '$ui/Highlight/Token.svelte';
	import Button from '$ui/Button.svelte';
	import Spacing from '$ui/Spacing.svelte';
	import CopyToClipboard from '$ui/icons/CopyToClipboard.svelte';

	import type { OptionValues } from '$types/OptionValues.types';
	import { m } from '$paraglide/messages';

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
<div class="wrapper">
	<Button ariaLabel={formatAriaLabelForCopyButton(values)} onClick={internalOnClick}>
		{m.copyCode()} <CopyToClipboard/>
	</Button>
</div>
<Spacing size={1} />
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: end;
	}
</style>
