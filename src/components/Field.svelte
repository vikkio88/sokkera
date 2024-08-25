<script>
  import { SIDES } from "../const/teams";
  import EmptyTile from "./EmptyTile.svelte";
  import Player from "./Player.svelte";

  function getRandomPlayer() {
    return {
      team: Math.random() < 0.5 ? SIDES.HOME : SIDES.AWAY,
      number: Math.floor(Math.random() * 98) + 2,
    };
  }

  const fieldRows = [
    [
      { players: [getRandomPlayer()] },
      { players: [] },
      { players: [] },
      { players: [] },
    ],
    [{ players: [] }, { players: [] }, { players: [] }, { players: [] }],
    [
      { players: [getRandomPlayer(), getRandomPlayer()] },
      { players: [] },
      { players: [] },
      { players: [] },
    ],
    [
      { players: [getRandomPlayer(), getRandomPlayer()] },
      { players: [] },
      { players: [] },
      { players: [] },
    ],
    [
      { players: [getRandomPlayer()] },
      { players: [] },
      { players: [] },
      { players: [] },
    ],
    [{ players: [] }, { players: [] }, { players: [] }, { players: [] }],
    [{ players: [] }, { players: [] }, { players: [] }, { players: [] }],
    [
      { players: [getRandomPlayer(), getRandomPlayer(), getRandomPlayer()] },
      { players: [] },
      { players: [] },
      { players: [] },
    ],
  ];
</script>

<div class="field">
  {#each fieldRows as row}
    <div class="row">
      {#each row as col}
        <div class="slot">
          {#each col.players as player}
            <Player number={player.number} team={player.team} />
          {:else}
            <EmptyTile />
          {/each}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .field {
    display: flex;
    flex-direction: column;
    min-height: 90vh;
    gap: 0.5rem;
  }
  @media (min-width: 1024px) {
    .field {
      max-width: 90%;
    }
  }

  .field .row {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    flex: 1;
  }

  .slot {
    padding: 1rem;
    background-color: #d0ffd6;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 0.2rem;
    column-gap: 0.1rem;
    flex: 1;
  }
</style>
