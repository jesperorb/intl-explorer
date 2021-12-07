<script lang="ts">
  import OptionHeader from "./OptionHeader.svelte";
  export let header: string;
</script>

<section>
  <OptionHeader text={header} />
  <slot />
</section>
