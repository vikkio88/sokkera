<script>
  export let number = 0;
</script>

<div class="player">{number}</div>

<style>
  .player {
    padding: 1rem;
    margin: auto;
    background-color: #92140C;
    border-radius: 1rem;
    height: 2rem;
    width: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }

  @media (max-width: 767px) {
    .player {
      height: 1rem;
      width: 1rem;
      font-size: 1.1rem;
    }
  }
</style>
