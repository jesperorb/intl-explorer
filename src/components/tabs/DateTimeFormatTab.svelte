<script lang="ts">
  import Highlight from "@components/Highlight.svelte";
  import OptionSection from "@components/OptionSection.svelte";
  import Grid from "@components/Grid.svelte";

  import { datetimeFormatOptions } from "@options/datetime-format-options";
  import { getFormatOptions } from "@utils/format-utils";
  import { copyToClipboard } from "@utils/copy-to-clipboard";

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
