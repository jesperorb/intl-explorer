<script lang="ts">
  import Highlight from "$lib/components/ui/Highlight.svelte";
  import OptionSection from "$lib/components/ui/OptionSection.svelte";
  import Grid from "$lib/components/ui/Grid.svelte";
  import Input from "$lib/components/ui/Input.svelte";

  import { copyToClipboard } from "$lib/utils/copy-to-clipboard";
  import { segmenterOptions } from "$lib/format-options/segmenter.options";
  import { selectedLocale } from "$lib/store/selected-locale";
import type { OptionValues } from "$lib/types/OptionValues.types";

  let sentence = "This is a sentence.";

  let onClick = async (options: OptionValues) => {
    await copyToClipboard(
      `Array.from(new Intl.Segmenter("${$selectedLocale}", ${JSON.stringify(
        options
      )}).segment("${sentence}"))`
    );
  };
</script>

<h2>Input values</h2>

<div>
  <Input id="list" label="List" bind:value={sentence} />
</div>

<h2>Output</h2>

<Grid>
  {#each [...segmenterOptions] as [option, values]}
    <OptionSection header={option}>
      {#each values as value}
        {#if value !== undefined}
          <Highlight
            {onClick}
            values={{ [option]: value }}
            output={JSON.stringify(Array.from(new Intl.Segmenter(
              $selectedLocale,
              { [option]: value },
            ).segment(sentence)))}
          />
        {/if}
      {/each}
    </OptionSection>
  {/each}
</Grid>
