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
    >. This is not a precise tool, it iterates every options property as is. If you have
    found a bug, file an issue or open a PR in the
    <a
      href="https://github.com/jesperorb/intl-explorer"
      target="_blank"
      rel="noopener noreferrer"
    >
      repo for this tool</a
    >. Created by
    <a href="https://jesperorb.com" target="_blank" rel="noopener noreferrer"
      >Jesper Orb</a
    >.
  </p>
</header>
<hr />
