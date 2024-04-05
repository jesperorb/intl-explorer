<script lang="ts">
	import { setContext } from "svelte";
	import * as m from "$paraglide/messages";
	import { i18nContextKey } from "$i18n/types";
	setContext(i18nContextKey, m);
</script>

<slot />
