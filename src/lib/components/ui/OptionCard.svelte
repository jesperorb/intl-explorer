<script lang="ts">
	import type { BrowserCoverage } from "$lib/types/BrowserSupport.types";
	import SupportLabel from "./BrowserSupport/SupportLabel.svelte";
  import Card from "./Card.svelte";
	import Spacing from "./Spacing.svelte";

  export let option: string;
  export let support: BrowserCoverage | undefined = undefined;
  export let hideFullSupport: boolean | undefined = false;
</script>
<Card>
  <div class="heading">
    <div>
      <label for={option}>{option}</label>
    </div>
    <SupportLabel {hideFullSupport} {support} />
  </div>
  <Spacing size={2} />
  <div class="content">
    <slot />
  </div>
</Card>

<style>
  label {
    font-weight: bold;
  }
  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>