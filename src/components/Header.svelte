<script lang="ts">
  export let header: string;
</script>

<header>
  <h1>{header} Explorer</h1>
  <p>
    Examples on how to use
    <a
      href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/{header}"
      target="_blank"
      rel="noopener noreferrer">MDN: Intl.{header}</a
    >. This is not a precise tool, it iterates every options property as is. If
    you have found a bug, file an issue or open a PR in the
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

<style>
  h1 {
    margin-bottom: 1rem;
  }
  header {
    margin: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid hsl(0, 0%, 45%);
  }
</style>
