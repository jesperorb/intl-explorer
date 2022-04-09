<script lang="ts">
  import Highlight from "../Highlight.svelte";
  import OptionSection from "../OptionSection.svelte";
  import Grid from "../Grid.svelte";

  import { datetimeFormatOptions } from "../../options/datetime-format-options";
  import { getFormatOptions } from "../../options/format-helpers";
  import type { OptionValues } from "../../types/option-values";
  import { copyToClipboard } from "../../utils/copyToClipboard";

  export let selectedLocale: string;

  let dateString = "2004-04-04T04:04:04";

  let onClick = async (options: OptionValues) => {
    await copyToClipboard(
      `new Intl.DateTimeFormat("${selectedLocale}", ${JSON.stringify(
        options
      )}).format(new Date("${dateString}"))`
    );
  };
</script>

<div>
  <label for="datetime">Date</label>
  <input type="datetime-local" id="datetime" step="1" bind:value={dateString} />
</div>

<Grid>
  {#each [...datetimeFormatOptions] as [option, values]}
    <OptionSection header={option}>
      {#each values as value}
        {#if value !== undefined}
          <Highlight
            {onClick}
            values={{ [option]: value }}
            output={new Intl.DateTimeFormat(
              selectedLocale,
              getFormatOptions(option, value)
            ).format(new Date(dateString))}
          />
        {/if}
      {/each}
    </OptionSection>
  {/each}
</Grid>

<style>
  input {
    border: 1px solid grey;
    border-radius: 4px;
    background-color: white;
    padding: 0.5rem;
  }
</style>