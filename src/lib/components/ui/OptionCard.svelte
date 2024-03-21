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
      <input type="checkbox" name={option} {checked} on:change={onChange} aria-label="{option} active" />
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