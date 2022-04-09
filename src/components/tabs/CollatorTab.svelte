<script lang="ts">
  import Grid from "../Grid.svelte";
  import OptionSection from "../OptionSection.svelte";
  import Highlight from "../Highlight.svelte";
  import type { OptionValues } from "../../types/option-values";
  import { collatorFormatOptions } from "../../options/collator-options";
  import { copyToClipboard } from "../../utils/copyToClipboard";
import Input from "../Input.svelte";

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
