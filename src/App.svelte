<script lang="ts">
  import { getFormatOptions } from "./formatters";

  import { datetimeFormatOptions } from "./locales/datetime-format-options";
  import { languageByLocaleAsEntries } from "./locales/locales";

  let selectedLanguage = window.navigator.language;

  let dateString = "2004-04-04T04:04:04";
</script>

<header>
  <h1>DateTimeFormat Explorer</h1>
  <p>
    Examples on how a date is formatted with
    <a
      href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat"
      target="_blank"
      rel="noopener noreferrer">MDN: Intl.DateTimeFormat</a
    >. This is not a precise tool, it iterates every options property as is. If
    you have found a bug, file an issue or open a PR in the
    <a
      href="https://github.com/jesperorb/datetimeformat-explorer"
      target="_blank"
      rel="noopener noreferrer"
    >
      repo for this tool</a
    >. Created by
    <a href="https://jesperorb.com" target="_blank" rel="noopener noreferrer"
      >Jesper Orb</a
    >.
  </p>

  <div class="options">
    <label for="language-select">Language</label>
    <select name="languages" id="language-select" bind:value={selectedLanguage}>
      <option value="">Select a language</option>
      {#each languageByLocaleAsEntries as [locale, lang]}
        <option value={locale}>{lang}</option>
      {/each}
    </select>
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
</header>
<main>
  {#each [...datetimeFormatOptions] as [option, values]}
    <section>
      <p class="option-header"><strong>{option}</strong></p>
      {#each values as value}
        {#if value !== undefined}
          <code>
            <pre>
              <span class="token punctuation">{"{"}</span> <span class="token key">{option}</span> <span class="token operator">{":"}</span> <span class="token string">"{value}"</span> <span class="token punctuation">{"}"}</span> <span class="token comment">
                // {new Intl.DateTimeFormat(
                  selectedLanguage,
                  getFormatOptions(option, value)
                ).format(new Date(dateString))}
              </span>
            </pre>
          </code>
        {/if}
      {/each}
    </section>
  {/each}
</main>

<style>
  header {
    padding: 1rem;
    border-bottom: 1px solid hsl(0, 0%, 45%);
  }

  header,
  p,
  h1,
  select,
  pre {
    margin-bottom: 1rem;
  }

  main {
    margin: 0 1rem;
  }

  @media screen and (min-width: 60rem) {
    main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }
  }

  pre {
    line-height: 1.5;
    padding: 1rem;
    background-color: #011627;
    font-size: 0.85rem;
    border-radius: 0.5rem;
    overflow-y: scroll;
  }

  label {
    display: block;
  }

  .option-header {
    font-size: 1.5rem;
  }

  .token.comment {
    display: block;
  }
</style>
