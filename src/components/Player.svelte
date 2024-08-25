<script>
  import { SIDES } from "../const/teams";

  export let number = 0;
  export let team = SIDES.AWAY;
</script>

<button
  class="no-button player"
  class:home={team === SIDES.HOME}
  class:away={team === SIDES.AWAY}
>
  {number}
</button>

<style>
  .player {
    padding: 1rem;    
    margin: .1rem;
    border-radius: .5rem;
    height: 1rem;
    width: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    box-shadow: 2px 2px black;

    align-self: center;
    justify-self: center;
  }

  .away {
    background: repeating-linear-gradient(
      90deg,
      #92140c,
      #92140c 10px,
      black 10px,
      black 20px
    );
  }

  .home {
    color: #f39c10;
    text-shadow: 2px 2px black;
    background: repeating-linear-gradient(
      90deg,
      white,
      white 10px,
      black 10px,
      black 20px
    );
  }

  @media (max-width: 767px) {
    .player {
      height: 1rem;
      width: 1rem;
      font-size: 1.1rem;
    }
  }
</style>
