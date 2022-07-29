<script lang="ts">
	import { isShopping, allAbilities, selectedShopFace, shopBuy, shopPhase } from '$lib/store';
	import type { IPlayer } from '$lib/store';
	import { getRandomAbility } from './../helper';
	import Dice from './Dice.svelte';
	import TileFaceIcon from './TileFaceIcon.svelte';
	export let player: IPlayer;

	let newItem = () => {
		const abi = getRandomAbility();
		return {
			key: abi,
			data: allAbilities[abi]
		};
	};

  let NoItem = () => {
		return {
			key: "d0",
			data: allAbilities["d0"]
		};
	};

	let abilities = [newItem(), newItem(), newItem()];

	let rerollShop = () => {
		abilities = [newItem(), newItem(), newItem()];
	};

	let selectedAbility = -1;
  let highlightedAbility = -1;

	shopBuy.subscribe((value) => {
		if (value && $shopBuy) {
			abilities[selectedAbility] = NoItem();
			player.gold = player.gold - 3;
			$shopBuy = false;
			selectedAbility = -1;
		}
	});

	let isShoppingAllowed = false;
	shopPhase.subscribe((value) => {
		isShoppingAllowed = value;
    if(isShoppingAllowed) {
      rerollShop();
    }
	});
</script>

<div class="shop-container">
	<button
		class="shop-button"
		class:is-shopping={$isShopping && isShoppingAllowed}
		class:is-visible={isShoppingAllowed}
		on:click={() => {
			if (isShoppingAllowed) isShopping.update((val) => !val);
		}}
	>
		Shop
	</button>

	<section class="shop" class:is-shopping={$isShopping && isShoppingAllowed}>
		<span style="font-size: 30px;">{"Gold: "+ player.gold}</span>
		<div class="cols">
			<div width="min-content">
				<ul class="shop-items">
					{#each abilities as ability, index}
						<li
							class="shop-item"
							class:selected={selectedAbility === index}
							style={`box-shadow: 0 0 ${(10-ability.data.rarity)*2}px ${(10-ability.data.rarity)*2}px red`}
							on:click={() => {
								if(selectedAbility == index) {
									selectedAbility = -1;
									$selectedShopFace = "";
								} else if (player.gold >= 3) {
									selectedAbility = index;
									$selectedShopFace = ability.key;
								}
							}}
				
							on:mouseenter={() => {
								highlightedAbility = index;
							}}
							on:mouseleave={() => {
								highlightedAbility = -1;
							}}
						>
              <TileFaceIcon icon={ability.data.icon} value={ability.data.value}/>
						</li>
					{/each}
				</ul>
				<div
					on:click={() => {
						if (player.gold >= 1) {
							selectedAbility = -1;
							$selectedShopFace = '';
							rerollShop();
							player.gold -= 1;
						}
					}}
					class="reroll-button">
					<img src={"/images/Reroll.png"} alt="Reroll" class="reroll-img" />
					<span class="reroll-text">Reroll - 1 Gold</span>
				</div>
				<div
					on:click={() => {
						$shopPhase = false;
						$isShopping = false;
					}}
					class="next-battle-button">
					<img src={"/images/Start_battle.png"} alt="Next Battle" class="next-battle-img" />
					<span class="next-battle-text">Next battle</span>
				</div>
			</div>
      <!-- {#each abilities as ability, index} -->
			<div class="item-description">
				{#if selectedAbility >= 0}
					<span>{abilities[selectedAbility].data.description}</span>
				{:else if highlightedAbility >= 0 }
          <span>{abilities[highlightedAbility].data.description}</span>
					<!-- <span>Select an ability to learn more</span> -->
				{/if}
      <!-- {/each} -->
			</div>
		</div>
	</section>
	<section class="bkg" class:is-shopping={$isShopping} />
	<p class="instructions" class:is-shopping={$isShopping}>
		Select an item in shop, then click a slot in any of your dice to replace. Each face costs 3 coins.
	</p>
	<section class="current-abi" class:is-shopping={$isShopping}>
		{#each player.dice as dice}
			<div class="dice-wrapper"><Dice {dice} /></div>
		{/each}
	</section>
</div>

{#if $shopPhase}
	<audio src="/music/game_game-1.mp3" type="audio/mpeg" autoplay loop />
{/if}

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
		margin-right: -2px;
		border-radius: 10px 0 0 10px;
		transition: transform 500ms ease;
		z-index: 3;
		opacity: 0;
		&:hover {
			cursor: pointer;
			transform:none
		}

		&.is-shopping {
			transform: translateX(-25rem);
		}
		&.is-visible {
			opacity: 1;
		}

		&:focus-visible {
			outline: none;
		}
	}

	.dice-wrapper {
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
			opacity: 0.95;
			display: block;
		}
	}

	.selected {
		transform: rotate(-10deg);
	}

	.instructions {
		position: fixed;
		top: 1rem;
		left: 18rem;
		color: white;
		text-shadow: -1px -1px 0 #391302, 1px -1px 0 #391302, -1px 1px 0 #391302, 1px 1px 0 #391302;
		z-index: 2;
		font-size: 2rem;
		width: 25rem;
		display: none;

		&.is-shopping {
			display: initial;
		}
	}

	.current-abi {
		color: white;
		position: fixed;
		top: 10rem;
		left: 20rem;
		box-sizing: border-box;
		transition: opacity 500ms ease display 500ms ease;
		z-index: 2;
		opacity: 0;
		display: none;
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
		height: 43rem;
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
        padding: 1em;
        font-size: 28px;
			}
		}

		.shop-items {
			padding: 0;
			margin-left: 1rem;
			list-style: none;
			display: flex;
			flex-direction: column;
			gap: 1rem;

			.shop-item {
				display: flex;
        margin-top: 10px;
        margin-bottom: 20px;
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
			color: white;
			bottom: 10px;
			margin-left: -2px;
			position: fixed;
			&:hover {
				cursor: pointer;
			}

			&:hover .reroll-text {
				color: greenyellow;
			}

			.reroll-img {
				width: 10rem;
			}

			.reroll-text {
				position: fixed;
				margin-left:-103px;
				bottom: 38px;
				text-shadow: -1px -1px 0 #391302, 1px -1px 0 #391302, -1px 1px 0 #391302, 1px 1px 0 #391302;
			}
		}

		.next-battle-button {
			color: white;
			bottom: 10px;
			position: fixed;
			margin-left: 215px;
			&:hover {
				cursor: pointer;
			}

			&:hover .next-battle-text {
				color: greenyellow;
			}

			.next-battle-img {
				width: 10rem;
			}

			.next-battle-text {
				position: fixed;
        margin-left: -98px;
				bottom: 38px;
				text-shadow: -1px -1px 0 #391302, 1px -1px 0 #391302, -1px 1px 0 #391302, 1px 1px 0 #391302;
			}
		}
	}
</style>
