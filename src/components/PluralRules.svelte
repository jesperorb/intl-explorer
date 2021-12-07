<script lang="ts">
  import Grid from "./Grid.svelte";
  import OptionSection from "./OptionSection.svelte";
  import Highlight from "./Highlight.svelte";

  export let selectedLocale: string;
  let type: Intl.PluralRuleType = "cardinal";
</script>

<div class="options" />
<div class="radio">
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
    <input
      type="radio"
      id="type-ordinal"
      name="type"
      bind:group={type}
      value="ordinal"
    />
  </label>
</div>
<Grid>
  <OptionSection header={type}>
    <Highlight
      values={{
        value: 1,
        type,
      }}
      output={new Intl.PluralRules(selectedLocale, {
        type,
      }).select(1)}
    />
    <Highlight
      values={{
        value: 2,
        type,
      }}
      output={new Intl.PluralRules(selectedLocale, {
        type,
      }).select(2)}
    />
    <Highlight
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

<style>
  .options {
    padding-bottom: 1rem;
  }
</style>
