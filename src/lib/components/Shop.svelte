<script lang="ts">
	import { isShopping, allAbilities, selectedShopFace, shopBuy, shopPhase, type IDice, makeFaces } from '$lib/store';
	import type { IPlayer } from '$lib/store';
	import { getRandomAbility } from './../helper';
	import Dice from './Dice.svelte';
	import TileFaceIcon from './TileFaceIcon.svelte';
import AudioPlayer from './AudioPlayer.svelte';
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

	const dicePool = [
		["d1","d1","d1","d1","h1","d0"],
		["d0","d0","d0"],
		["b2","s1","d3","h2","h2","d0","d0","d0","d0","d0",],
	]
	let newDice = () => {
		let d = Math.floor(dicePool.length * Math.random())
		const x:IDice = {
			faces: makeFaces(dicePool[d])
		}
		return x;
	}

	let abilities = [newItem(), newItem(), newItem(), newItem()];
	let dice:IDice|null = newDice();
	let potion = true;
	let rerollShop = () => {
		abilities = [newItem(), newItem(), newItem(), newItem()];
		potion = true;
		dice = newDice();
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
		<div class="gold-container"><img src={"/images/Gold.png"} alt="Gold: " class="gold-icon"><p class="gold-text">{player.gold}</p></div>
		<div class="cols">
			<div width="min-content">
				<ul class="shop-items">
					{#each abilities as ability, index}
					<!-- style={`box-shadow: 0 0 ${(12-ability.data.rarity)*2}px ${(12-ability.data.rarity)*2}px red`} -->
						<div class="item-container">
							<li
								class="shop-item"
								class:selected={selectedAbility === index}
								style={`box-shadow: 0 0 ${(12-ability.data.rarity)}px ${(12-ability.data.rarity)}px red`}
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
								<TileFaceIcon ability={ability.data} small={true}/>
							</li>
							<div class="item-text">
								{#if highlightedAbility == index || selectedAbility == index}
									<p class="item-desc">{ability.data.description}</p>
									<p class="item-cost">Cost: {ability.data.cost}</p>
								{:else}
									<p class="item-title">{ability.data.name}</p>
									<p class="item-cost">Cost: {ability.data.cost}</p> 
								{/if}
							</div>
						</div>
					{/each}
				</ul>
				
				<div class="reroll-button"
					on:click={() => {
						if (player.gold >= 1) {
							selectedAbility = -1;
							$selectedShopFace = '';
							rerollShop();
							player.gold -= 1;
						}
					}}>
					<img src={"/images/Reroll.png"} alt="Reroll" class="reroll-img" />
					<span class="reroll-text">Reroll - 1 Gold</span>
				</div>
				<div class="next-battle-button"
					on:click={() => {
						$shopPhase = false;
						$isShopping = false;
					}}>
					<img src={"/images/Start_battle.png"} alt="Next Battle" class="next-battle-img" />
					<span class="next-battle-text">Next battle</span>
				</div>
			</div>
			<ul class="shop-items">
				<div class="item-container">
					<li
						class="shop-item"
						on:click={() => {
							if (player.gold >= player.dice.length * 8 && dice !== null) {
								player.dice.push(dice);
								player.dice = player.dice;
								player.gold -= player.dice.length * 8;
								dice = null;
							}
						}}
					>
						{#if dice}
							<Dice dice={dice} smaller={true}/>
						{:else}
							<p>Sold</p>
						{/if}
					</li>
					{#if dice}
						<div class="item-text">
							<p class="item-title">D{dice.faces.length}</p>
							<p class="item-cost">Cost: {player.dice.length * 8}</p>
							<!-- <p class="item-desc">{ability.data.description}</p> -->
						</div>
					{/if}
				</div>
			</ul>
		</div>
		
	</section>
	<section class="bkg" class:is-shopping={$isShopping} />
	<p class="instructions" class:is-shopping={$isShopping}>
		Select an item in shop, then click a slot in any of your dice to replace. Each face costs 3 coins.
	</p>
	<section class="current-abi" class:is-shopping={$isShopping}>
		{#each player.dice as dice, index}
			{#if index == player.dice.length-1}
				<div><Dice {dice} /></div>
			{:else}
				<div class="dice-wrapper"><Dice {dice} /></div>
			{/if}
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
			transform: translateX(-45rem);
		}
		&.is-visible {
			opacity: 1;
		}

		&:focus-visible {
			outline: none;
		}
	}

	.gold-container {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.gold-icon {
			width: 50px;
			
		}
		.gold-text {
			font-size: 20px;
			margin: 0px 0px 0px 3px;
		}
	}
	
	.bkg {
		background-color: rgba(30, 30, 30);
		color: white;
		position: fixed;
		top: rem;
		left: 0rem;
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
		left: 3rem;
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
		left: 3rem;
		box-sizing: border-box;
		transition: opacity 500ms ease display 500ms ease;
		z-index: 2;
		opacity: 0;
		height: 500px;
		overflow-y: scroll;
		overflow-x: hidden;
		padding: 30px;
		width: 400px;
		display: none;
		flex-wrap: wrap;
    	justify-content: center;
		row-gap: 10px;
		.dice-wrapper {
			border-bottom: thick solid white;
			margin-bottom: 0px;
			padding-bottom: 20px;
		}
		&.is-shopping {
			opacity: 1;
			display: flex;
		}
		
	}

	::-webkit-scrollbar {
			width: 15px;
			// background-color: #f1f1f1;
		}

	/* Track */
	::-webkit-scrollbar-track {
		display:none
	}
		
	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888; 
		border-radius: 100px;
		// height: 10px!important ;

		}

	.shop {
		background-color: rgb(180, 116, 43);
		color: white;
		position: fixed;
		top: 1rem;
		right: -45rem;
		width: 45rem;
		height: 43rem;
		border-bottom-left-radius: 10px;
		box-sizing: border-box;
		padding: 1rem;
		transition: transform 500ms ease;
		z-index: 3;

		&.is-shopping {
			transform: translateX(-45rem);
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

			.item-container {
				display: flex;
				justify-content: center;
				.shop-item {
					display: flex;
					margin-top: 10px;
					margin-bottom: 10px;
					flex-direction: column;
					border-radius: 10px;
					align-items: center;
					justify-content: center;
					transition: background-color 150ms ease-in-out;
					
					&:hover {
						cursor: pointer;
						// background-color: rgb(35, 141, 43);
					}

					&.selected {
						// background-color: rgb(35, 141, 43);
					}
				}
				.item-text {
					width: 200px;
					margin:0px;
					margin-left: 15px;
					.item-title {
						margin-top: 39px;
						margin-bottom: 0px;
						font-size: 24px;
					}
					.item-cost {
						font-size: 16px;
    					margin-top: 4px;
						margin-bottom: 0px;
					}
					.item-desc {
						margin: 0px;
						height: 31px;
						margin-top: 39px;
						font-size:14px;
					}
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
