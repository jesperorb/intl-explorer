<script lang="ts">
  import OptionHeader from "@components/OptionHeader.svelte";

  export let header: string;
</script>

<section data-testid={`option-section-${header}`}>
  <OptionHeader text={header} />
  <slot />
</section>
