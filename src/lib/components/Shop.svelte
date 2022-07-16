<script lang="ts">
  let isShopping = false;
</script>

<div class="shop-container">
  <button
    class="shop-button"
    class:is-shopping={isShopping}
    on:click={() => {
      isShopping = !isShopping;
      console.log(isShopping);
    }}
  >
    Shop
  </button>
  <section class="shop" class:is-shopping={isShopping}>
    <span>Items to buy</span>
    <ul class="shop-items">
      <li class="shop-item">
        <span>Item 1</span>
        <span>3G</span>
      </li>
      <li class="shop-item">
        <span>Item 2</span>
        <span>3G</span>
      </li>
      <li class="shop-item">
        <span>Item 3</span>
        <span>3G</span>
      </li>
    </ul>
    <p>Some description of something goes here. Lore, lorem ipsum dolor sit amet.</p>
    <button class="reroll-button">Reroll</button>
  </section>
</div>

<style lang="scss">
  .shop-button {
    background-color: rgb(180, 116, 43);
    color: white;
    position: fixed;
    top: 1rem;
    right: 0;
    width: 4rem;
    height: 4rem;
    border: none;
    padding: none;
    border-radius: 10px 0 0 10px;
    transition: transform 500ms ease;
    
    &:hover {
      cursor: pointer;
    }

    &.is-shopping {
      transform: translateX(-25rem);
    }

    &:focus-visible {
      outline: none;
    }
  }

  .shop {
    background-color: rgb(180, 116, 43);
    color: white;
    position: fixed;
    top: 1rem;
    right: -25rem;
    width: 25rem;
    height: 35rem;
    border-bottom-left-radius: 10px;
    box-sizing: border-box;
    padding: 1rem;
    transition: transform 500ms ease;

    &.is-shopping {
      transform: translateX(-25rem);
    }

    .shop-items {
      padding: 0;
      list-style: none;
      display: flex;
      gap: 1rem;

      .shop-item {
        display: flex;
        flex-direction: column;
        width: 16rem;
        height: 8rem;
        background-color: rgb(43, 180, 54);
        align-items: center;
        justify-content: center;
      }
    }

    .reroll-button {
      width: 10rem;
      height: 4rem;
      background-color:rgb(37, 61, 141);
      color: white;
      border-radius: 10px;
    }
  }
</style>