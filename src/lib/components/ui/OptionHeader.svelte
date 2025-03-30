<script lang="ts">
	type Props = {
		text: string;
	};

	let { text }: Props = $props();
</script>

<h3><strong>{text}</strong></h3>

<style>
	h3 {
		font-size: 1.1rem;
		word-break: break-all;
		font-weight: normal;
	}
</style>
