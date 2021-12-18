<script lang="ts">
  import Grid from "../Grid.svelte";
  import OptionSection from "../OptionSection.svelte";
  import Highlight from "../Highlight.svelte";
  import { copyToClipboard } from "../../utils/copyToClipboard";
  import type { OptionValues } from "../../types/option-values";

  export let selectedLocale: string | string[];
  let type: Intl.PluralRuleType = "cardinal";

  let onClick = async (options: OptionValues) => {
    await copyToClipboard(
      `new Intl.PluralRules("${selectedLocale}", ${JSON.stringify(
        Object.assign({}, options, { value: undefined })
      )}).select(${options.value})`
    );
  };
</script>

<div>
  <label>
    type: cardinal
    <input
      type="radio"
      id="type-cardinal"
      name="type"
      bind:group={type}
      value="cardinal"
    />
  </label>
  <label>
    type: ordinal
    <input type="radio" id="type-ordinal" name="type" bind:group={type} value="ordinal" />
  </label>
</div>

<Grid>
  <OptionSection header={type}>
    <Highlight
      {onClick}
      values={{
        value: 1,
        type,
      }}
      output={new Intl.PluralRules(selectedLocale, {
        type,
      }).select(1)}
    />
    <Highlight
      {onClick}
      values={{
        value: 2,
        type,
      }}
      output={new Intl.PluralRules(selectedLocale, {
        type,
      }).select(2)}
    />
    <Highlight
      {onClick}
      values={{
        value: 20,
        type,
      }}
      output={new Intl.PluralRules(selectedLocale, {
        type,
      }).select(20)}
    />
  </OptionSection>
  <OptionSection header={"localeMatcher"}>
    <Highlight
      {onClick}
      values={{
        value: 1,
        type,
        localeMatcher: "best fit",
      }}
      output={new Intl.PluralRules(selectedLocale, {
        type,
        localeMatcher: "best fit",
      }).select(1)}
    />
    <Highlight
      {onClick}
      values={{
        value: 2,
        type,
        localeMatcher: "lookup",
      }}
      output={new Intl.PluralRules(selectedLocale, {
        type,
        localeMatcher: "lookup",
      }).select(2)}
    />
  </OptionSection>
</Grid>
