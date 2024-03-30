<script lang="ts">
	import { setContext } from "svelte";
  import * as m from "$paraglide/messages"
	import { i18nContextKey } from "./types";
  setContext(i18nContextKey, m);
</script>

<slot />