<script lang="ts">
	import Token from "./Token.svelte";

	type Props = {
		locales: string[];
	};

	let { locales }: Props = $props();
</script>

{#if locales.length === 1}
	<Token v={`"${locales[0]}"`} t="string" />
{:else if !locales.length}
	<Token v={`undefined`} t="number" />
{:else}
	<Token v={`[`} t="key" /><Token v={locales.map((l) => `"${l}"`).join(",")} t="string" /><Token
		v={`]`}
		t="key"
	/>
{/if}
