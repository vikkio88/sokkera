<script>
  import Player from "./Player.svelte";
</script>

<div class="field">
  <div class="slot"></div>
  <div class="slot"></div>
  <div class="slot"></div>
  <div class="slot">
    <Player number={9} />
    <Player number={9} />
    <Player number={9} />
  </div>
  <div class="slot"></div>
  <div class="slot"></div>
  <div class="slot">
    <Player />
  </div>
  <div class="slot"></div>
  <div class="slot">
    <Player />
  </div>
  <div class="slot">
    <Player />
  </div>
  <div class="slot">
    <Player />
  </div>
  <div class="slot">
    <Player />
  </div>
  <div class="slot"></div>
  <div class="slot"></div>
  <div class="slot"></div>
  <div class="slot"></div>
  <div class="slot"></div>
  <div class="slot"></div>
  <div class="slot"></div>
  <div class="slot"></div>
  <div class="slot"></div>
  <div class="slot"></div>
  <div class="slot"></div>
  <div class="slot"></div>
</div>

<style>
  .field {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    column-gap: 0.5rem;
    padding-top: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    row-gap: 0.5rem;
    min-height: 90vh;
    background-color: white;
  }

  @media (min-width: 1024px) {
    .field {
      max-width: 90%;
    }
  }

  .slot {
    background-color: #d0ffd6;
    display: grid;
    grid-template-columns: 1fr 1fr; /* 2 columns within each slot */
    grid-template-rows: 1fr 1fr; /* 2 rows within each slot */
    width: 100%;
    height: 100%;
  }
</style>
