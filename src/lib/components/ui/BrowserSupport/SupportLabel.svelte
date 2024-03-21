<script lang="ts">
	import type { BrowserCoverage } from "$lib/types/BrowserSupport.types";

  export let support: BrowserCoverage | undefined = undefined;
  export let hideFullSupport: boolean | undefined = false;
</script>

<p class="{support === "full" && hideFullSupport ? "" : support}">
  {#if support === "full" && !hideFullSupport}
    Full support
  {:else if support === "none"}
    No support
  {:else if support === "partial" }
    Partial support
  {/if}
</p>

<style>
  .full {
    color: var(--darkgreen);
  }
  .partial {
    color: var(--yellow);
  }
  .none {
    color: var(--darkred);
  }
  .missing {
    color: var(--gray);
  }
</style>