import { writable } from 'svelte/store';

export enum EGlobalStates {
	START_SCREEN,
	SHOP,
	BATTLE,
	LOSE,
	INSTRUCTIONS,
	WIN
}

export interface IFace {
	ability: IAbility;
}
export interface IDice {
	faces: IFace[];
	rolled?: IFace;
}
export enum EAnimationStates {
	IDLE,
	HIT,
	ATTACK
}
export interface IPlayer {
	name: string;
	description?: string;
	maxHealth: number;
	health: number;
	gold: number;
	dice: IDice[];
	defense: number;
	animationState: EAnimationStates;
	animations: {
		[EAnimationStates.IDLE]: string;
		[EAnimationStates.HIT]?: string;
		[EAnimationStates.ATTACK]?: string;
	};
}

export interface IAbility {
	// 1 - 0, 1 = not rare at all
	rarity: number;

	name: string;
	description: string;
	icon: string;
	value: string;

	// applies to the other player, can be negative to heal
	damage?: number;

	//applies to all enemies
	cleaveDamage?: number;

	// remove form attack damage value to a limit of 0
	defense?: number;

	// applies to player health, can be negative
	heal?: number;

	healAll?: number;

	// applies psn status that decreaases health by psn and then decreases psn by 1
	poison?: number;

	// multiplies damage (currently)
	multiplier?: number;

	gold?: number;

	goldAtt?: boolean;
	// allows the dice to be rolled again and stack the effects
	// rolling?: boolean;

	// allows the face to be increased by grow amount
	// grow?: number;
}

// If we make them non const, we can easily modify rarities on the fly
// we can also make an array/dict of rarity to easily change rarity per level
// or have rarity be a list of numbers that we try to access based on what level you are in
const COMMON_R = 10;
const UNCOMMON_R = 6;
const UNRARE_R = 3;
const RARE_R = 2;

// When rendering description and name, convert %(str) into the apropriate attribute
// could also make description "smart" by looking at what type of values it has

export const allAbilities: { [key: string]: IAbility } = {
	//damage
	d0: {
		name: 'Nothing',
		description: '',
		rarity: 0,
		icon: '/images/Blank_Icon.png',
		value: ''
	},
	d1: {
		name: 'Attack 1',
		description: 'Deals 1 damage',
		rarity: 0,
		icon: '/images/Attack_Icon.png',
		value: '1',
		damage: 1
	},
	d2: {
		name: 'Attack 2',
		description: 'Deals 2 damage',
		rarity: COMMON_R,
		icon: '/images/Attack_Icon.png',
		value: '2',
		damage: 2
	},
	d3: {
		name: 'Attack 3',
		description: 'Deals 3 damage',
		rarity: UNCOMMON_R,
		icon: '/images/Attack_Icon.png',
		value: '3',
		damage: 3
	},
	d4: {
		name: 'Attack 4',
		description: 'Deals 4 damage',
		rarity: UNRARE_R,
		icon: '/images/Attack_Icon.png',
		value: '4',
		damage: 4
	},
	d5: {
		name: 'Attack 5',
		description: 'Deals 5 damage',
		rarity: RARE_R,
		icon: '/images/Attack_Icon.png',
		value: '5',
		damage: 5
	},
	d8: {
		name: 'Attack 8',
		description: 'Deals 8 damage, take 4 damage',
		rarity: 1,
		icon: '/images/Attack_Icon.png',
		value: '8*',
		damage: 8,
		heal: -4
	},
	d10: {
		name: 'Attack 10',
		description: 'Deals 10 damage',
		rarity: 0,
		icon: '/images/Attack_Icon.png',
		value: '10',
		damage: 10
	},

	// cleave
	dc1: {
		name: 'Cleave 1',
		description: 'Deals 1 damage to all enemies',
		rarity: UNCOMMON_R,
		icon: '/images/Cleave_Icon.png',
		value: '1',
		cleaveDamage: 1
	},
	dc2: {
		name: 'Cleave 2',
		description: 'Deals 2 damage to all enemies',
		rarity: UNRARE_R,
		icon: '/images/Cleave_Icon.png',
		value: '2',
		cleaveDamage: 2
	},
	dc3: {
		name: 'Cleave 3',
		description: 'Deals 3 damage to all enemies',
		rarity: RARE_R,
		icon: '/images/Cleave_Icon.png',
		value: '3',
		cleaveDamage: 3
	},

	// cleave heal
	hc1: {
		name: 'Heal All 1',
		description: 'Heal 1 hp to all allies',
		rarity: 0,
		icon: '/images/Heal_all_Icon.png',
		value: '1',
		healAll: 1
	},
	hc2: {
		name: 'Heal All 2',
		description: 'Deals 2 damage to all enemies',
		rarity: 0,
		icon: '/images/Heal_all_Icon.png',
		value: '2',
		healAll: 2
	},
	hc3: {
		name: 'Heal All 3',
		description: 'Deals 3 damage to all enemies',
		rarity: 0,
		icon: '/images/Heal_all_Icon.png',
		value: '3',
		healAll: 3
	},

	// poison
	// p1: {
	// 	name: 'Poison %p',
	// 	description:
	// 		'Inflicts 1 Poison \n (Enemy takes damage equal to the # of Poison stacks they have, then decreases Poison by 1.)',
	// 	rarity: 1,
	// 	icon: 'green',
	// 	value: "1",
	// 	poison: 1
	// },
	// p2: {
	// 	name: 'Poison %p',
	// 	description:
	// 		'Inflicts 2 Poison \n (Enemy takes damage equal to the # of Poison stacks they have, then decreases Poison by 1.)',
	// 	rarity: 8,
	// 	icon: 'green',
	// 	value: "2",
	// 	poison: 2
	// },
	// p3: {
	// 	name: 'Poison %p',
	// 	description:
	// 		'Inflicts 3 Poison \n (Enemy takes damage equal to the # of Poison stacks they have, then decreases Poison by 1.)',
	// 	rarity: 5,
	// 	icon: 'green',
	// 	value: "3",
	// 	poison: 3
	// },

	//shield
	s1: {
		name: 'Shield 1',
		description: 'Blocks 1 damage',
		rarity: 0,
		icon: '/images/Shield_Icon.png',
		value: '1',
		defense: 1
	},
	s2: {
		name: 'Shield 2',
		description: 'Blocks 2 damage',
		rarity: COMMON_R,
		icon: '/images/Shield_Icon.png',
		value: '2',
		defense: 2
	},
	s3: {
		name: 'Shield 3',
		description: 'Blocks 3 damage',
		rarity: UNCOMMON_R,
		icon: '/images/Shield_Icon.png',
		value: '3',
		defense: 3
	},
	s4: {
		name: 'Shield 4',
		description: 'Blocks 4 damage',
		rarity: UNRARE_R,
		icon: '/images/Shield_Icon.png',
		value: '4',
		defense: 4
	},
	s5: {
		name: 'Shield 6',
		description: 'Blocks 5 damage',
		rarity: RARE_R,
		value: '6',
		icon: '/images/Shield_Icon.png',
		defense: 5
	},
	s10: {
		name: 'Shield 10',
		description: 'Blocks 10 damage',
		rarity: 0,
		value: '10',
		icon: '/images/Shield_Icon.png',
		defense: 10
	},

	// healing

	h1: {
		name: 'Heal 1',
		description: 'Restores 1 HP',
		rarity: 0,
		value: '1',
		icon: '/images/Heal_Icon.png',
		heal: 1
	},
	h2: {
		name: 'Heal 2',
		description: 'Restores 2 HP',
		rarity: COMMON_R,
		value: '2',
		icon: '/images/Heal_Icon.png',
		heal: 2
	},
	h3: {
		name: 'Heal 3',
		description: 'Restores 3 HP',
		rarity: UNCOMMON_R,
		value: '3',
		icon: '/images/Heal_Icon.png',
		heal: 3
	},
	h10: {
		name: 'Heal 10',
		description: 'Restores 10 HP',
		rarity: 0,
		value: '10',
		icon: '/images/Heal_Icon.png',
		heal: 10
	},

	//gold
	g1: {
		name: 'Gold 1',
		description: 'Passive: Increases gold generation next shop',
		rarity: UNCOMMON_R,
		icon: '/images/Gold_Icon.png',
		value: '1',
		gold: 1,
	},
	g2: {
		name: 'Gold 2',
		description: 'Passive: Increases gold generation next shop',
		rarity: UNRARE_R,
		icon: '/images/Gold_Icon.png',
		value: '2',
		gold: 2
	},
	g3: {
		name: 'Gold 3',
		description: 'Passive: Increases gold generation next shop',
		rarity: RARE_R,
		icon: '/images/Gold_Icon.png',
		value: '3',
		gold: 3,
	},

	// special
	b2: {
		name: 'Berserk x2',
		description: 'Multiplies damage done by 2 and deals 1 damage to self',
		rarity: RARE_R,
		icon: '/images/Multiply_Icon.png',
		value: '',
		heal: -1,
		multiplier: 2
	},
	gx: {
		name: 'Gold Attack',
		description: 'Does damage based on how much gold you have',
		rarity: RARE_R,
		icon: '/images/Midas_Icon.png',
		value: '',
		goldAtt: true,
	}
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

export const waveInitEnemies: IPlayer[][] = [
	[
		{
			name: 'Training Dummy',
			maxHealth: 10,
			health: 10,
			defense: 0,
			gold: 0,
			animationState: EAnimationStates.IDLE,
			animations: {
				[EAnimationStates.IDLE]: '/images/Catfish.png',
				[EAnimationStates.ATTACK]: '/images/Catfish_Attack.png'
			},
			dice: [
				{
					faces: [
						{ ability: allAbilities['d0'] },
						{ ability: allAbilities['s1'] },
						{ ability: allAbilities['d1'] },
						{ ability: allAbilities['d1'] },
						{ ability: allAbilities['d1'] },
						{ ability: allAbilities['h1'] }
					]
				}
			]
		}
	],
	[
		{
			name: 'Snake',
			maxHealth: 8,
			health: 8,
			defense: 0,
			gold: 0,
			animationState: EAnimationStates.IDLE,
			animations: {
				[EAnimationStates.IDLE]: '/images/Eel.png',
				[EAnimationStates.ATTACK]: '/images/Eel_Attack.png'
			},
			dice: [
				{
					faces: [
						{ ability: allAbilities['d1'] },
						{ ability: allAbilities['d1'] },
						{ ability: allAbilities['d1'] },
						{ ability: allAbilities['d2'] },
						{ ability: allAbilities['d2'] },
						{ ability: allAbilities['d3'] }
					]
				}
			]
		},
		{
			name: 'Snake',
			maxHealth: 8,
			health: 8,
			defense: 0,
			gold: 0,
			animationState: EAnimationStates.IDLE,
			animations: {
				[EAnimationStates.IDLE]: '/images/Piranha.png',
				[EAnimationStates.ATTACK]: '/images/Piranha_Attack.png'
			},
			dice: [
				{
					faces: [
						{ ability: allAbilities['d1'] },
						{ ability: allAbilities['d1'] },
						{ ability: allAbilities['d1'] },
						{ ability: allAbilities['d2'] },
						{ ability: allAbilities['d2'] },
						{ ability: allAbilities['d3'] }
					]
				}
			]
		},
		{
			name: 'Snake',
			maxHealth: 8,
			health: 8,
			defense: 0,
			gold: 0,
			animationState: EAnimationStates.IDLE,
			animations: {
				[EAnimationStates.IDLE]: '/images/Fish_Goon.png',
				[EAnimationStates.ATTACK]: '/images/Fish_Goon_Attack.png'
			},
			dice: [
				{
					faces: [
						{ ability: allAbilities['d1'] },
						{ ability: allAbilities['d1'] },
						{ ability: allAbilities['d1'] },
						{ ability: allAbilities['d2'] },
						{ ability: allAbilities['d2'] },
						{ ability: allAbilities['d3'] }
					]
				}
			]
		}
	],
	[
		{
			name: 'Dragon',
			maxHealth: 50,
			health: 50,
			defense: 0,
			gold: 0,
			animationState: EAnimationStates.IDLE,
			animations: {
				[EAnimationStates.IDLE]: '/images/Eel.png'
			},
			dice: [
				{
					faces: [
						{ ability: allAbilities['d10'] },
						{ ability: allAbilities['s10'] },
						{ ability: allAbilities['h10'] },
						{ ability: allAbilities['d10'] },
						{ ability: allAbilities['d10'] },
						{ ability: allAbilities['d0'] }
					]
				}
			]
		}
	]
];

export const player = writable<IPlayer>({
	name: 'Roe',
	maxHealth: 30,
	health: 30,
	gold: 10,
	defense: 0,
	animationState: EAnimationStates.IDLE,
	animations: {
		[EAnimationStates.IDLE]: '/images/Fisher.png',
		[EAnimationStates.ATTACK]: '/images/Fisher_Attack.png'
	},
	dice: [
		{
			faces: [
				{ ability: allAbilities['d1'] },
				{ ability: allAbilities['d1'] },
				{ ability: allAbilities['d2'] },
				{ ability: allAbilities['d2'] },
				{ ability: allAbilities['s1'] },
				{ ability: allAbilities['s1'] }
			]
		},
		{
			faces: [
				{ ability: allAbilities['d1'] },
				{ ability: allAbilities['d1'] },
				{ ability: allAbilities['d2'] },
				{ ability: allAbilities['d2'] },
				{ ability: allAbilities['s1'] },
				{ ability: allAbilities['s1'] }
			]
		}
	]
});

export const enemies = writable<IPlayer[]>([
	{
		name: '2',
		maxHealth: 10,
		health: 10,
		gold: 0,
		defense: 0,
		animationState: EAnimationStates.IDLE,
		animations: {
			[EAnimationStates.IDLE]: 'test.jpg'
		},
		dice: [
			{
				faces: [
					{ ability: allAbilities['d0'] },
					{ ability: allAbilities['s1'] },
					{ ability: allAbilities['d1'] },
					{ ability: allAbilities['d1'] },
					{ ability: allAbilities['d1'] },
					{ ability: allAbilities['h1'] }
				]
			}
		]
	}
]);

export const setEnemiesToWave = (n: number) => {
	enemies.set(waveInitEnemies[n]);
};

export const globalGameState = writable<EGlobalStates>(EGlobalStates.START_SCREEN);

export const shopPhase = writable(false);
export const isShopping = writable(false);
export const selectedShopFace = writable<string>('');
export const shopBuy = writable<boolean>(false);

export const beRolling = writable(false);

export const audioList = writable<{ id: number; audio: string }[]>([]);
export const playAudio = (audio: string) => {
	audioList.update((old) => {
		old.push({ id: Math.random(), audio });
		return old;
	});
};
