<script>
  import Field from "./components/Field.svelte";
  import gameState from "./store/field";
</script>

<main>
  <Field />
  <button on:click={() => gameState.changeTurn()}>
    Turn: {$gameState.turn}</button
  >
</main>

<style>

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
