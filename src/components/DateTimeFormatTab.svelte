<script>
  import Highlight from "./Highlight.svelte";
  import OptionSection from "./OptionSection.svelte";
  import Select from "./Select.svelte";
  import Grid from "./Grid.svelte";

  import { languageByLocaleAsEntries } from "../locale-data/locales";
  import { datetimeFormatOptions } from "../options/datetime-format-options";
  import { getFormatOptions } from "../options/format-helpers";

  let selectedLanguage = navigator.language;
  let dateString = "2004-04-04T04:04:04";
</script>

<div class="options">
  <Select
    name="langs"
    placeholder="Select a language"
    label="Language"
    items={languageByLocaleAsEntries}
    bind:value={selectedLanguage}
  />
  <div>
    <label for="datetime">Date</label>
    <input
      type="datetime-local"
      id="datetime"
      step="1"
      bind:value={dateString}
    />
  </div>
</div>

<Grid>
  {#each [...datetimeFormatOptions] as [option, values]}
    <OptionSection header={option}>
      {#each values as value}
        {#if value !== undefined}
          <Highlight
            values={{ [option]: value }}
            output={new Intl.DateTimeFormat(
              selectedLanguage,
              getFormatOptions(option, value)
            ).format(new Date(dateString))}
          />
        {/if}
      {/each}
    </OptionSection>
  {/each}
</Grid>

<style>
  .options {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }
</style>
