<script lang="ts">
	import type { FormatMethodsKeys } from '$lib/format-methods';
	import MdnLink from '$lib/components/ui/MDNLink.svelte';
	import Spacing from '$lib/components/ui/Spacing.svelte';
	export let header: string;
	export let link: FormatMethodsKeys | undefined = undefined;
	const formatHeader = (header: string) => {
		if (header.includes('Playground')) return header;
		return `Intl.${header.includes('NumberFormat') ? header.split('/').join(' ') : header}`;
	};
	const formatLink = (header: string) => {
		if (header.includes('NumberFormat')) return 'NumberFormat';
		return header;
	};
</script>

<header>
	<h1>
		{formatHeader(header)}
	</h1>
	<div>
		<div class="wrapper">
			<slot></slot>
		</div>
		<MdnLink header={link ?? formatLink(header)} />
	</div>
</header>
<Spacing />

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
	}

	.wrapper {
		display: inline-flex;
		margin-right: var(--spacing-2);
	}
</style>
