<script lang="ts">
  import Grid from "@components/Grid.svelte";
  import OptionSection from "@components/OptionSection.svelte";
  import Highlight from "@components/Highlight.svelte";
  import Input from "@components/Input.svelte";

  import { collatorFormatOptions } from "@options/collator-options";
  import { copyToClipboard } from "@utils/copy-to-clipboard";

  export let selectedLocale: string;
  let list = "Z,a,z,ä,1,=,à";

  let onClick = async (options: OptionValues) => {
    await copyToClipboard(
      `[].sort(new Intl.Collator("${selectedLocale}", ${JSON.stringify(
        options
      )}).compare)`
    );
  };
</script>

<div>
  <Input id="list" label="List" value={list} />
</div>

<Grid>
  {#each [...collatorFormatOptions] as [option, values]}
    <OptionSection header={option}>
      {#each values as value}
        {#if value !== undefined}
          <Highlight
            {onClick}
            values={{ [option]: value }}
            output={list
              .split(",")
              .sort(
                new Intl.Collator(selectedLocale, {
                  [option]: value,
                }).compare
              )
              .join(",")}
          />
        {/if}
      {/each}
    </OptionSection>
  {/each}
</Grid>
