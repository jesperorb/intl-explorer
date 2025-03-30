<script lang="ts">
	import MdnLink from "$ui/MDNLink.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import type { FormatMethodsKeys } from "$lib/format-methods";

	type Props = {
		header: string;
		link?: FormatMethodsKeys | undefined;
		children?: import('svelte').Snippet;
	}

	let { header, link = undefined, children }: Props = $props();

	const formatHeader = (header: string) => {
		if (header.includes("Playground")) return header;
		return `Intl.${header.includes("NumberFormat") ? header.split("/").join(" ") : header}`;
	};

	const formatLink = (header: string) => {
		if (header.includes("NumberFormat")) return "NumberFormat";
		return header;
	};

</script>

<header>
	<h1>
		{formatHeader(header)}
		{#if header === "DurationFormat" || link === "DurationFormat"}
			<img height="22" width="22" src="/icons/experimental.svg" alt="Experimental" />
		{/if}
	</h1>
	<div class="metadata">
		<div class="wrapper">
			{@render children?.()}
		</div>
		<MdnLink header={link ?? formatLink(header)} />
	</div>
</header>
<Spacing />

<style>
	header {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--spacing-2);
	}

	h1 {
		outline: none;
	}

	.wrapper {
		display: inline-flex;
	}
</style>
