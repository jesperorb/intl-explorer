<script>
  import OptionHeader from "./OptionHeader.svelte";
  export let header;
</script>

<section>
  <OptionHeader text={header} />
  <slot />
</section>
