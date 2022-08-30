<script lang="ts">
  export let header: string;
  const getHeader = (h: string): string => h.replace("Currency", "").replace("Unit", "");
</script>

<header>
  <h1>{getHeader(header)} Explorer</h1>
  <p>
    Examples on how to use
    <a
      href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/{getHeader(
        header
      )}"
      target="_blank"
      rel="noopener noreferrer">MDN: Intl.{getHeader(header)}</a
    >. Choose a formatter in the select below and a locale that you want the output to be displayed in.
    Each code snippet will display the output of each option to pass to the formatter. Each code snippet
    also has a "Copy"-button that will copy the code that produces the output to your clipboard.
  </p>
  <p>
    Depending on which browser you use some of these formatter will not work. If you have found a bug or want to
    improve something, open a PR in the
    <a
      href="https://github.com/jesperorb/intl-explorer"
      target="_blank"
      rel="noopener noreferrer"
    >
      repo for this tool</a
    >. Created by
    <a href="https://jesperorb.com" target="_blank" rel="noopener noreferrer"
      >Jesper Orb</a
    >.</p>
</header>
<hr />
