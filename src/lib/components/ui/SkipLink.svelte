<script lang="ts">
	import { getMessages } from "$lib/i18n/util";

	const m = getMessages();
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
	}
	.skip-link:focus {
		transform: translateY(0);
	}
</style>
