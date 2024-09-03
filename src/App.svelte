<script>
  import Field from "./components/Field.svelte";
  import gameState from "./store/field";
  import { SIDES } from "./types/teams";
</script>

<main>
  <Field />
  <button on:click={() => gameState.changeTurn()}>
    Turn: {$gameState.turn.side === SIDES.HOME ? "Home" : "Away"}</button
  >
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
