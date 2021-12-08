<script lang="ts">
  import Highlight from "../Highlight.svelte";
  import OptionSection from "../OptionSection.svelte";
  import Grid from "../Grid.svelte";
  import { relativeTimeFormatUnits } from "../../options/relative-time-format-options";
  import { copyToClipboard } from "../../utils/copyToClipboard";
  import type { OptionValues } from "../../types/option-values";

  export let selectedLocale: string;

  let onClick = (options: OptionValues) => {
    copyToClipboard(
      `new Intl.RelativeTimeFormat("${selectedLocale}", ${JSON.stringify(
        Object.assign({}, options, { value: undefined })
      )}).format(${dayValue}, "${options.value}")`
    );
  };

  let dayValue = 2;
  let style: Intl.Style = "long";
  let numeric: "always" | "auto" = "auto";
</script>

<div class="options">
  <div>
    <label for="value">Value</label>
    <input type="text" id="value" bind:value={dayValue} />
  </div>
  <div class="radio">
    <label>
      style: long
      <input
        type="radio"
        id="style-long"
        name="style"
        bind:group={style}
        value="long"
      />
    </label>
    <label>
      style: short
      <input
        type="radio"
        id="style-short"
        name="style"
        bind:group={style}
        value="short"
      />
    </label>
    <label>
      style: narrow
      <input
        type="radio"
        id="style-narrow"
        name="style"
        bind:group={style}
        value="narrow"
      />
    </label>
  </div>
  <div class="radio">
    <label>
      numeric: always
      <input
        type="radio"
        id="numeric-always"
        name="numeric"
        bind:group={numeric}
        value="always"
      />
    </label>
    <label>
      numeric: auto
      <input
        type="radio"
        id="numeric-auto"
        name="numeric"
        bind:group={numeric}
        value="auto"
      />
    </label>
  </div>
</div>

<Grid>
  <OptionSection header={"unit"}>
    {#each relativeTimeFormatUnits as value}
      {#if value !== undefined}
        <Highlight
          {onClick}
          values={{ value: value, style, numeric }}
          output={new Intl.RelativeTimeFormat(selectedLocale, {
            style,
            numeric,
          }).format(dayValue, value)}
        />
      {/if}
    {/each}
  </OptionSection>
</Grid>

<style>
  .options {
    padding-bottom: 1rem;
  }

  input {
    margin-bottom: 1rem;
  }

  .radio {
    display: flex;
    gap: 1rem;
  }
</style>
