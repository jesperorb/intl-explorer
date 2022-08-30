<script lang="ts">
  import Highlight from "@components/Highlight.svelte";
  import OptionSection from "@components/OptionSection.svelte";
  import Grid from "@components/Grid.svelte";
  import Input from "@components/Input.svelte";

  import { copyToClipboard } from "@utils/copy-to-clipboard";
  import { segmenterOptions } from "@options/segmenter-options";

  export let selectedLocale: string;

  let sentence = "This is a sentence.";

  let onClick = async (options: OptionValues) => {
    await copyToClipboard(
      `Array.from(new Intl.Segmenter("${selectedLocale}", ${JSON.stringify(
        options
      )}).segment("${sentence}"))`
    );
  };
</script>

<div>
  <Input id="list" label="List" bind:value={sentence} />
</div>

<Grid>
  {#each [...segmenterOptions] as [option, values]}
    <OptionSection header={option}>
      {#each values as value}
        {#if value !== undefined}
          <Highlight
            {onClick}
            values={{ [option]: value }}
            output={JSON.stringify(Array.from(new Intl.Segmenter(
              selectedLocale,
              { [option]: value },
            ).segment(sentence)))}
          />
        {/if}
      {/each}
    </OptionSection>
  {/each}
</Grid>
