<script lang="ts">
	import type { BrowserCoverage } from "$lib/types/BrowserSupport.types";
	import SupportLabel from "./BrowserSupport/SupportLabel.svelte";
  import Card from "./Card.svelte";
	import Spacing from "./Spacing.svelte";

  export let option: string;
  export let support: BrowserCoverage | undefined = undefined;
  export let hideFullSupport: boolean | undefined = false;
  export let checked: boolean | undefined = true;
	export let onChange: ((event: Event) => void) | undefined = undefined;
</script>
<Card>
  <div class="heading">
    <div>
      <label for="{option}_active" class="sr-only">{option} active</label>
      <input type="checkbox" name="{option}_active" id="{option}_active" {checked} on:change={onChange} />
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