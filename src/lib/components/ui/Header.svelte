<script lang="ts">
	import MdnLink from './MDNLink.svelte';
	export let header: string;
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
	{#if header !== 'Playground'}
		<MdnLink header={formatLink(header)} />
	{/if}
</header>

<style>
	header {
		margin-bottom: 1rem;
	}
</style>
