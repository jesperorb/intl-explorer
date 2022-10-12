<script lang="ts">
	import HighlightValue from '$lib/components/ui/HighlightValue.svelte';
	import Token from './Highlight/Token.svelte';
	type OptionValues = { [key: string]: number | boolean | string };

	export let values: OptionValues;
	export let output: string;
	export let onClick: (values: OptionValues) => void = () => ({});
	let internalOnClick = () => {
		onClick(values);
	};
</script>

<div class="highlight">
	<code>
		<pre>
			<Token t="punctuation">{'{'}</Token>
			{#each Object.entries(values) as [key, value]}
				<Token t="key">{key}</Token><Token t="operator">:</Token>
				<HighlightValue
					{value}
				/>
				{#if Object.keys(values).length > 1}
					<Token t="punctuation">, </Token>
				{/if}
			{/each}
			<Token t="punctuation">{'}'}</Token><br />
			<Token t="comment">// {output}</Token>
		</pre>
	</code>
	<button
		class="copy"
		aria-label="Copy values for options: {JSON.stringify(values)}"
		on:click={internalOnClick}>Copy</button
	>
</div>

<style>
	.highlight {
		position: relative;
		margin-bottom: 1.5rem;
	}
	.copy {
		background-color: #011627;
		border: 1px solid var(--white);
		border-radius: 0.25rem;
		padding: 0.75rem 1.25rem;
		cursor: pointer;
		color: var(--white);
		position: absolute;
		z-index: 1;
		bottom: -1.5rem;
		right: 0.5rem;
	}
	.copy:hover {
		background-color: rgb(14, 73, 121);
	}
	pre {
		white-space: normal;
	}
</style>
