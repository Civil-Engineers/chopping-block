<script lang="ts">
import { each } from 'svelte/internal';

  let isShopping = false;

  let abilities = [
    {
      name: "Attack 2",
      description: "Deals 2 damage",
      value: 2,
      cost: 2,
    },
    {
      name: "Shield 3",
      description: "Blocks 3 damage",
      value: 3,
      cost: 3,
    },
    {
      name: "Heal 5",
      description: "Restores 5 HP",
      value: 5,
      cost: 4,
    },
  ];
  let selectedAbility = -1;
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
    <div class="cols">
      <div>
        <ul class="shop-items">
          {#each abilities as ability, index}
            <li
              class="shop-item"
              class:selected="{selectedAbility === index}"
              on:click={() => selectedAbility = index}
            >
              <span>{ability.name}</span>
              <span>{ability.cost} Gold</span>
            </li>
          {/each}
        </ul>
        <button class="reroll-button">Reroll</button>
      </div>
      <div class="item-description">
        {#if selectedAbility >= 0}
          <span>{abilities[selectedAbility].description}</span>
        {:else}
          <span>Select an ability to learn more</span>
        {/if}
      </div>
    </div>
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

    .cols {
      display: flex;
      gap: 1rem;

      .item-description {
        margin: 1em 0;
      }
    }

    .shop-items {
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .shop-item {
        display: flex;
        flex-direction: column;
        width: 8rem;
        height: 8rem;
        background-color: rgb(43, 180, 54);
        border-radius: 10px;
        align-items: center;
        justify-content: center;
        transition: background-color 150ms ease-in-out;

        &:hover {
          cursor: pointer;
          background-color: rgb(35, 141, 43);
        }

        &.selected {
          background-color: rgb(35, 141, 43);
        }
      }
    }

    .reroll-button {
      width: 8rem;
      height: 4rem;
      background-color:rgb(37, 61, 141);
      color: white;
      border-radius: 10px;
    }
  }
</style>