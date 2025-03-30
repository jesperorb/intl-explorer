<script lang="ts">
	import MdnLink from "$ui/MDNLink.svelte";
	import Spacing from "$ui/Spacing.svelte";

	import type { FormatMethodsKeys } from "$lib/format-methods";

	export let header: string;
	export let link: FormatMethodsKeys | undefined = undefined;

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
			<slot />
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

	.wrapper {
		display: inline-flex;
	}
</style>
