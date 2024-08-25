<script>
  import { SIDES } from "../const/teams";
  import Player from "./Player.svelte";

  const slots = [
    { players: [{ number: 9, side: SIDES.HOME }] },
    { players: [] },
    { players: [] },
    { players: [] },
    { players: [] },
    { players: [] },
    { players: [] },
    { players: [] },
    { players: [] },
    { players: [] },
    { players: [] },
    { players: [] },
    {
      players: [
        { number: 10, side: SIDES.HOME },
        { number: 4, side: SIDES.HOME },
        { number: 2, side: SIDES.AWAY },
      ],
    },
    { players: [
      { number: 33, side: SIDES.AWAY },
    ] },
    { players: [
      { number: 33, side: SIDES.HOME },
    ] },
    { players: [
      { number: 22, side: SIDES.AWAY },
    ] },
    { players: [
      { number: 11, side: SIDES.HOME },
      { number: 21, side: SIDES.AWAY },
    ] },
    { players: [] },
    {
      players: [
        { number: 8, side: SIDES.AWAY },
        { number: 10, side: SIDES.AWAY },
        { number: 9, side: SIDES.AWAY },
      ],
    },
    { players: [] },
    { players: [] },
    { players: [] },
    { players: [] },
    { players: [] },
    { players: [] },
  ];
</script>

<div class="field">
  {#each slots as slot}
    <div class="slot">
      {#each slot.players as player}
        <Player number={player.number} side={player.side} />
      {/each}
    </div>
  {/each}
</div>

<style>
  .field {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    column-gap: 0.1rem;
    row-gap: 0.1rem;
    padding-top: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
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
