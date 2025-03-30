<script lang="ts">
	import OpenInNewTab from "$ui/icons/OpenInNewTab.svelte";

	type Props = {
		header: string;
	};

	let { header }: Props = $props();
</script>

<a
	href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/{String(
		header
	)}"
	target="_blank"
	rel="noopener noreferrer">MDN<OpenInNewTab /></a
>
