<script lang="ts">
  import OptionHeader from "$lib/components/ui/OptionHeader.svelte";

  export let header: string;
</script>

<section data-testid={`option-section-${header}`}>
  <OptionHeader text={header} />
  <slot />
</section>
