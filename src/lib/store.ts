import { writable } from 'svelte/store';

export enum EGlobalStates {
	START_SCREEN,
	SHOP,
	BATTLE
}

export interface IFace {
	ability: IAbility;
}
export interface IDice {
	faces: IFace[];
}
export interface IPlayer {
	name: string;
	description?: string;
	maxHealth: number;
	health: number;
	gold?: number;
	dice: IDice[];
}

export interface IAbility {
	// 1 - 0, 1 = not rare at all
	rarity: number;

	name: string;
	description: string;
	icon: string;

	// applies to the other player, can be negative to heal
	damage?: number;

	// remove form attack damage value to a limit of 0
	defense?: number;

	// applies to player health, can be negative
	heal?: number;

	// applies psn status that decreaases health by psn and then decreases psn by 1
	poison?: number;

	// multiplies damage (currently)
	multiplier?: number;

	// allows the dice to be rolled again and stack the effects
	// rolling?: boolean;

	// allows the face to be increased by grow amount
	// grow?: number;
}

// If we make them non const, we can easily modify rarities on the fly
// we can also make an array/dict of rarity to easily change rarity per level
// or have rarity be a list of numbers that we try to access based on what level you are in 
const COMMON_R = 1;
const UNCOMMON_R = .5;

// When rendering description and name, convert %(str) into the apropriate attribute
// could also make description "smart" by looking at what type of values it has

export const allAbilities = {
	//damage
	d0:{
		name: "Nothing",
		description: '',
		rarity: 0,
		icon: '',
	},
	d1: {
		name: 'Attack 1',
		description: 'Deals 1 damage',
		rarity: 0,
		icon: '',
		damage: 2,
	},
	d2: {
		name: 'Attack 2',
		description: 'Deals 2 damage',
		rarity: COMMON_R,
		icon: '',
		damage: 2,
	},
	d3: {
		name: 'Attack %d',
		description: 'Deals %d damage',
		rarity: .8,
		icon: '',
		damage: 2,
	},
	d4: {
		name: 'Attack %d',
		description: 'Deals %d damage',
		rarity: .6,
		icon: '',
		damage: 4,
	},
	d5: {
		name: 'Attack %d',
		description: 'Deals %d damage',
		rarity: .4,
		icon: '',
		damage: 5,
	},
	d8: {
		name: 'Attack %d',
		description: 'Deals %d damage, take %hd damage',
		rarity: .1,
		icon: '',
		damage: 8,
		heal: -1,
	},

	// poison
	p1: {
		name: 'Poison %p',
		description: 'Inflicts 1 Poison \n (Enemy takes damage equal to the # of Poison stacks they have, then decreases Poison by 1.)',
		rarity: 1,
		icon: '',
		poison: 1
	},
	p2: {
		name: 'Poison %p',
		description: 'Inflicts 2 Poison \n (Enemy takes damage equal to the # of Poison stacks they have, then decreases Poison by 1.)',
		rarity: .8,
		icon: '',
		poison: 2
	},
	p3: {
		name: 'Poison %p',
		description: 'Inflicts 3 Poison \n (Enemy takes damage equal to the # of Poison stacks they have, then decreases Poison by 1.)',
		rarity: .5,
		icon: '',
		poison: 3
	},

	//shield
	s1: {
		name: 'Shield 1',
		description: 'Blocks 1 damage',
		rarity: COMMON_R,
		icon: '',
		defense: 1,
	},
	s2: {
		name: 'Shield 2',
		description: 'Blocks 2 damage',
		rarity: COMMON_R,
		icon: '',
		defense: 2,
	},
	s3: {
		name: 'Shield 3',
		description: 'Blocks 3 damage',
		rarity: COMMON_R,
		icon: '',
		defense: 3,
	},
	s4: {
		name: 'Shield 4',
		description: 'Blocks 4 damage',
		rarity: .8,
		icon: '',
		defense: 3,
	},
	s5: {
		name: 'Shield 5',
		description: 'Blocks 5 damage',
		rarity: .4,
		icon: '',
		defense: 5,
	},

	// healing

	h1: {
		name: 'Heal 1',
		description: 'Restores 1 HP',
		rarity: 0,
		icon: '',
		heal: 1,
	},
	h2: {
		name: 'Heal 2',
		description: 'Restores 2 HP',
		rarity: COMMON_R,
		icon: '',
		heal: 2,
	},
	h3: {
		name: 'Heal 3',
		description: 'Restores 3 HP',
		rarity: UNCOMMON_R,
		icon: '',
		heal: 3,
	},

	// special
	b2: {
		name: 'Berserk x%m',
		description: 'Multiplies damage done and deals %h damage to self',
		rarity: UNCOMMON_R,
		icon: '',
		heal: -1,
		multiplier: 2
	},
	// upgr: {
	// 	name: 'Upgrade 1',
	// 	description: 'Upgrade all faces by 1 for this battle',
	// 	rarity: .4,
	// 	icon: '',
	// 	upgrade: 1,
	// }
	// sg2: {
	// 	name: 'Growing Shield 2',
	// 	description: 'Blocks xdamage',
	// 	rarity: .4,
	// 	icon: '',
	// 	defense: 2,
	//  growing: 1
	// },

};

export const waveInitEnemies:IPlayer[][] = [
	[{
		name: "Training Dummy",
		maxHealth: 10,
		health: 10,
		dice: [
			{
				faces: [
					{ability: allAbilities["d0"]},
					{ability: allAbilities["s1"]},
					{ability: allAbilities["d1"]},
					{ability: allAbilities["d1"]},
					{ability: allAbilities["d1"]},
					{ability: allAbilities["h1"]},
				]
			}
		]
	}],
	[{
		name: "Snake",
		maxHealth: 8,
		health: 8,
		dice: [
			{
				faces: [
					{ability: allAbilities["d1"]},
					{ability: allAbilities["p1"]},
					{ability: allAbilities["p1"]},
					{ability: allAbilities["p2"]},
					{ability: allAbilities["p2"]},
					{ability: allAbilities["p3"]},
				]
			}
		]
	}]
]

export const player = writable<IPlayer>({
	name: "Roe",
	maxHealth: 30,
	health: 10,
	gold: 0,
	dice:  [
				{
					faces: [
						{ability: allAbilities["d1"]},
						{ability: allAbilities["d1"]},
						{ability: allAbilities["d1"]},
						{ability: allAbilities["d2"]},
						{ability: allAbilities["d2"]},
						{ability: allAbilities["d3"]},
					]
				},
				{
					faces: [
						{ability: allAbilities["h1"]},
						{ability: allAbilities["h2"]},
						{ability: allAbilities["s1"]},
						{ability: allAbilities["s1"]},
						{ability: allAbilities["s1"]},
						{ability: allAbilities["s2"]},
					]
				}
			]
});

export const enemies = writable<IPlayer[]>([
	{
		name: "2",
		maxHealth: 30,
		health: 30,
		gold: 0,
		dice: [
			{
				faces: [
					{ability: allAbilities["d1"]},
					{ability: allAbilities["d1"]},
					{ability: allAbilities["d1"]},
					{ability: allAbilities["d2"]},
					{ability: allAbilities["d2"]},
					{ability: allAbilities["d3"]},
				]
			}
		]
	}
]);

export const setEnemiesToWave = (n: number) => {
	enemies.update(e => e = waveInitEnemies[n]);
}

export const globalGameState = writable<EGlobalStates>(EGlobalStates.START_SCREEN);
