<script lang="ts">
	type Props = {
		children?: import("svelte").Snippet;
	};

	let { children }: Props = $props();
</script>

<span>
	{@render children?.()}
</span>

<style>
	span {
		border: 0 !important;
		clip: rect(1px, 1px, 1px, 1px) !important;
		-webkit-clip-path: inset(50%) !important;
		clip-path: inset(50%) !important;
		height: 1px !important;
		margin: -1px !important;
		overflow: hidden !important;
		padding: 0 !important;
		position: absolute !important;
		width: 1px !important;
		white-space: nowrap !important;
	}
</style>
