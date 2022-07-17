<script lang="ts">
  import { isShopping, allAbilities, selectedShopFace} from "$lib/store";
  import type { IPlayer } from '$lib/store';
  import { getRandomAbility } from './../helper';
  import Dice from './Dice.svelte';
  export let player: IPlayer;

  let newItem = () =>{
    const abi = getRandomAbility();
    return {
      key: abi,
      data: allAbilities[abi]
    }
  }

  let abilities = [
    newItem(),
    newItem(),
    newItem()
    // {
    //   getRandomAbility()
    // },
    // {
    //   name: "Shield 3",
    //   description: "Blocks 3 damage",
    //   value: 3,
    //   cost: 3,
    // },
    // {
    //   name: "Heal 5",
    //   description: "Restores 5 HP",
    //   value: 5,
    //   cost: 4,
    // },
  ];
  let selectedAbility = -1;
</script>

<div class="shop-container">
  <button
    class="shop-button"
    class:is-shopping={$isShopping}
    on:click={() => {
      isShopping.update(val => !val);
    }}
  >
    Shop
  </button>
  <section class="shop" class:is-shopping={$isShopping}>
    <span>{player.gold}</span>
    <div class="cols">
      <div>
        <ul class="shop-items">
          {#each abilities as ability, index}
            <li
              class="shop-item"
              class:selected="{selectedAbility === index}"
              on:click={() => {selectedAbility = index; $selectedShopFace = ability.key}}
            >
              <span>{ability.data.name}</span>
              <span>{3} Gold</span>
            </li>
          {/each}
        </ul>
        <button class="reroll-button">Reroll</button>
      </div>
      <div class="item-description">
        {#if selectedAbility >= 0}
          <span>{abilities[selectedAbility].data.description}</span>
        {:else}
          <span>Select an ability to learn more</span>
        {/if}
      </div>
    </div>
  </section>
  <section class="bkg" class:is-shopping={$isShopping}>
  </section>
  <section class="current-abi" class:is-shopping={$isShopping}>
			{#each player.dice as dice}
				<div class="dice-wrapper"><Dice {dice} /></div>
			{/each}
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
    z-index: 3;

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

  .dice-wrapper{
    margin-bottom: 5rem;
  }
  .bkg {
    background-color: rgba(30, 30, 30);
    color: white;
    position: fixed;
    top: rem;
    left: 00rem;
    width: 100rem;
    height: 100rem;
    border-bottom-left-radius: 10px;
    box-sizing: border-box;
    transition: opacity 500ms ease;
    z-index: 2;
    opacity: 0;
    display: none;

    &.is-shopping {
      opacity: .95;
      display: block;
    }
  }

  .current-abi {
    //background-color: rgba(30, 30, 30);
    color: white;
    position: fixed;
    top:10rem;
    left: 20rem;
    box-sizing: border-box;
    transition: opacity 500ms ease display 500ms ease;
    z-index: 2;
    opacity: 0;
    display:none;
    &.is-shopping {
      opacity: 1;
      display: initial;
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
    z-index: 3;

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
