<script lang="ts">
	import { m } from "$paraglide/messages";
</script>

<a class="skip-link" href="#main">{m.skipLink()}</a>

<style>
	.skip-link {
		position: fixed;
		top: 0;
		left: 0;
		height: 22px;
		transform: translateY(-24px);
		transition: transform 0.3s;
		color: var(--text-color);
		background-color: var(--background-color);
		border-bottom: 2px solid var(--text-color);
	}
	.skip-link:focus {
		transform: translateY(0);
	}
</style>
