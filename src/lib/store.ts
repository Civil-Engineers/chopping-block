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
	temp_bonus: IAbility;
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
	poison: number;
	dice: IDice[];
	rolllingEffects?: IAbility;

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
	damage: number;

	//applies to all enemies
	cleaveDamage: number;

	// remove form attack damage value to a limit of 0
	defense: number;

	// applies to player health, can be negative
	heal: number;

	healAll: number;

	// applies psn status that decreaases health by psn and then decreases psn by 1
	poison: number;

	// multiplies damage (currently)
	multiplier: number;

	gold: number;

	goldAtt: boolean;
	// allows the dice to be rolled again and stack the effects
	rolling: boolean;

	// allows the face to be increased by grow amount
	grow?: IAbility;

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
export const newAbility = (template: any) =>{
	const ability:IAbility = {
		rarity: template.rarity ?? 0,
		name: template.name ?? "",
		description: template.description ?? "",
		icon: template.icon ?? "",
		value: template.value ?? "",

		damage: template.damage ?? 0,
		cleaveDamage: template.cleaveDamage ?? 0,
		defense: template.defense ?? 0,
		heal: template.heal ?? 0,
		healAll: template.healAll ?? 0,
		poison: template.poison ?? 0,
		multiplier: template.multiplier ?? 1,
		gold: template.gold ?? 0,
		goldAtt: template.goldAtt ?? false,
		rolling: template.rolling ?? false,
		grow: template.grow,
	}
	return ability;
}

export const makeAbility = (key: string) => {
	return newAbility(allAbilities[key]);
}

export const makeFace = (key: string) => {
	const face:IFace = {ability:makeAbility(key), temp_bonus:makeAbility("d0")}
	return face;
}

export const resetTempBonus = (player: IPlayer) => {
	for (const d of player.dice) {
		for (const f of d.faces) {
			f.temp_bonus = makeAbility("d0");
		}
	}
}

export const makeFaces = (keys: string[]) => {
	return keys.map((k)=> {
		return makeFace(k);
	})
}

const damage = {
	d0: newAbility({
		name: 'Nothing',
		description: 'Does nothing',
		rarity: 0,
		icon: '/images/Blank_Icon.png',
		value: ''
	}),
	d1: newAbility({
		name: 'Attack 1',
		description: 'Deals 1 damage',
		rarity: 0,
		icon: '/images/Attack_Icon.png',
		value: '1',
		damage: 1
	}),
	d2: newAbility({
		name: 'Attack 2',
		description: 'Deals 2 damage',
		rarity: COMMON_R,
		icon: '/images/Attack_Icon.png',
		value: '2',
		damage: 2
	}),
	d3: newAbility({
		name: 'Attack 3',
		description: 'Deals 3 damage',
		rarity: UNCOMMON_R,
		icon: '/images/Attack_Icon.png',
		value: '3',
		damage: 3
	}),
	d4: newAbility({
		name: 'Attack 4',
		description: 'Deals 4 damage',
		rarity: UNRARE_R,
		icon: '/images/Attack_Icon.png',
		value: '4',
		damage: 4
	}),
	d5: newAbility({
		name: 'Attack 5',
		description: 'Deals 5 damage',
		rarity: RARE_R,
		icon: '/images/Attack_Icon.png',
		value: '5',
		damage: 5
	}),
	d7: newAbility({
		name: 'Attack 7',
		description: 'Deals 7 damage',
		rarity: 0,
		icon: '/images/Attack_Icon.png',
		value: '7',
		damage: 7,
	}),
	d8: newAbility({
		name: 'Attack 8',
		description: 'Deals 8 damage, take 4 damage',
		rarity: 1,
		icon: '/images/Attack_Icon.png',
		value: '8*',
		damage: 8,
		heal: -4
	}),
	d10: newAbility({
		name: 'Attack 10',
		description: 'Deals 10 damage',
		rarity: 0,
		icon: '/images/Attack_Icon.png',
		value: '10',
		damage: 10
	}),
};

const cleave = {
	dc1: newAbility({
		name: 'Cleave 1',
		description: 'Deals 1 damage to all enemies',
		rarity: UNCOMMON_R,
		icon: '/images/Cleave_Icon.png',
		value: '1',
		cleaveDamage: 1
	}),
	dc2: newAbility({
		name: 'Cleave 2',
		description: 'Deals 2 damage to all enemies',
		rarity: UNRARE_R,
		icon: '/images/Cleave_Icon.png',
		value: '2',
		cleaveDamage: 2
	}),
	dc3: newAbility({
		name: 'Cleave 3',
		description: 'Deals 3 damage to all enemies',
		rarity: RARE_R,
		icon: '/images/Cleave_Icon.png',
		value: '3',
		cleaveDamage: 3
	}),
};

const healAllAlly = {
	hc1: newAbility({
		name: 'Heal All 1',
		description: 'Heal 1 hp to all allies',
		rarity: 0,
		icon: '/images/Heal_all_Icon.png',
		value: '1',
		healAll: 1
	}),
	hc2: newAbility({
		name: 'Heal All 2',
		description: 'Deals 2 damage to all enemies',
		rarity: 0,
		icon: '/images/Heal_all_Icon.png',
		value: '2',
		healAll: 2
	}),
	hc3: newAbility({
		name: 'Heal All 3',
		description: 'Deals 3 damage to all enemies',
		rarity: 0,
		icon: '/images/Heal_all_Icon.png',
		value: '3',
		healAll: 3
	}),
};

const poison = {
	p1: newAbility({
		name: 'Poison 1',
		description:
			'Inflicts 1 Poison',
		rarity: 0,
		icon: '/images/Poison_Icon.png',
		value: "1",
		poison: 1
	}),
	p2: newAbility({
		name: 'Poison 2',
		description:
			'Inflicts 2 Poison',
		rarity: 6,
		icon: '/images/Poison_Icon.png',
		value: "2",
		poison: 2
	}),
	p3: newAbility({
		name: 'Poison 3',
		description:
			'Inflicts 3 Poison',
		rarity: 2,
		icon: '/images/Poison_Icon.png',
		value: "3",
		poison: 3
	}),
};

const shield = {
	//shield
	s1: newAbility({
		name: 'Shield 1',
		description: 'Blocks 1 damage',
		rarity: 0,
		icon: '/images/Shield_Icon.png',
		value: '1',
		defense: 1
	}),
	s2: newAbility({
		name: 'Shield 2',
		description: 'Blocks 2 damage',
		rarity: COMMON_R,
		icon: '/images/Shield_Icon.png',
		value: '2',
		defense: 2
	}),
	s3: newAbility({
		name: 'Shield 3',
		description: 'Blocks 3 damage',
		rarity: UNCOMMON_R,
		icon: '/images/Shield_Icon.png',
		value: '3',
		defense: 3
	}),
	s4: newAbility({
		name: 'Shield 4',
		description: 'Blocks 4 damage',
		rarity: UNRARE_R,
		icon: '/images/Shield_Icon.png',
		value: '4',
		defense: 4
	}),
	s5: newAbility({
		name: 'Shield 5',
		description: 'Blocks 5 damage',
		rarity: RARE_R,
		value: '5',
		icon: '/images/Shield_Icon.png',
		defense: 5
	}),
	s10: newAbility({
		name: 'Shield 10',
		description: 'Blocks 10 damage',
		rarity: 0,
		value: '10',
		icon: '/images/Shield_Icon.png',
		defense: 10
	}),
};

const heal = {
	h1: newAbility({
		name: 'Heal 1',
		description: 'Restores 1 HP',
		rarity: 0,
		value: '1',
		icon: '/images/Heal_Icon.png',
		heal: 1
	}),
	h2: newAbility({
		name: 'Heal 2',
		description: 'Restores 2 HP',
		rarity: COMMON_R,
		value: '2',
		icon: '/images/Heal_Icon.png',
		heal: 2
	}),
	h3: newAbility({
		name: 'Heal 3',
		description: 'Restores 3 HP',
		rarity: UNCOMMON_R,
		value: '3',
		icon: '/images/Heal_Icon.png',
		heal: 3
	}),
	h5: newAbility({
		name: 'Heal 5',
		description: 'Restores 5 HP',
		rarity: 0,
		value: '5',
		icon: '/images/Heal_Icon.png',
		heal: 5
	}),
}

const gold = {
	g1: newAbility({
		name: 'Gold 1',
		description: 'Passive: Increases gold generation next shop',
		rarity: UNCOMMON_R,
		icon: '/images/Gold_Icon.png',
		value: '1',
		gold: 1,
	}),
	g2: newAbility({
		name: 'Gold 2',
		description: 'Passive: Increases gold generation next shop',
		rarity: UNRARE_R,
		icon: '/images/Gold_Icon.png',
		value: '2',
		gold: 2
	}),
	g3: newAbility({
		name: 'Gold 3',
		description: 'Passive: Increases gold generation next shop',
		rarity: RARE_R,
		icon: '/images/Gold_Icon.png',
		value: '3',
		gold: 3,
	}),
}

const growing = {
	dg2: newAbility({
		name: 'Growing Attack 2',
		description: 'Deals 2 damage and increases 2 each time used (Until battle end)',
		rarity: 4,
		icon: '',
		defense: 2,
		value: '%d',
		grow: newAbility({damage:2})
	}),
	sg2: newAbility({
		name: 'Growing Shield 2',
		description: 'Blocks 2 damage and increases 2 each time used (Until battle end)',
		rarity: 4,
		icon: '',
		defense: 2,
		value: '%s',
		grow: newAbility({defense:2})
	}),
}

const special = {
	b2: newAbility({
		name: 'Berserk x2',
		description: 'Multiplies damage done by 2',
		rarity: UNRARE_R,
		icon: '/images/Multiply_Icon.png',
		value: '',
		multiplier: 2
	}),
	gx: newAbility({
		name: 'Gold Attack',
		description: 'Does damage based on how much gold you have',
		rarity: RARE_R,
		icon: '/images/Midas_Icon.png',
		value: '',
		goldAtt: true,
	}),
	dp4: newAbility({
		name: 'Vicious Attack 4',
		description: 'Deals 4 damage, take 2',
		rarity: 0,
		icon: '/images/Attack_Icon.png',
		value: '4',
		damage: 4,
		heal: -2
	}),
}

export const allAbilities: { [key: string]: IAbility } = {
	...damage,
	...cleave,
	...healAllAlly,
	...poison,
	...shield,
	...heal,
	...gold,
	...growing,

	...special,

	// upgr: newAbility({
	// 	name: 'Upgrade 1',
	// 	description: 'Upgrade all faces by 1 for this battle',
	// 	rarity: .4,
	// 	icon: '',
	// 	upgrade: 1,
	// }
};

const createFishGoon = () => {
	let ret:IPlayer = {
		name: 'Training Dummy',
		maxHealth: 10,
		health: 10,
		defense: 0,
		poison: 0,
		gold: 0,
		animationState: EAnimationStates.IDLE,
		animations: {
			[EAnimationStates.IDLE]: '/images/Fish_Goon.png',
			[EAnimationStates.ATTACK]: '/images/Fish_Goon_Attack.png'
		},
		dice: [
			{
				faces: makeFaces(['d1', 'd1', 'd1', 'd2', 'h1', 's2'])
			}
		]
	}
	return ret;
}

const createPiranha = () => {
	let ret:IPlayer = {
		name: 'Training Dummy',
		maxHealth: 12,
		health: 12,
		defense: 0,
		poison: 0,
		gold: 0,
		animationState: EAnimationStates.IDLE,
		animations: {
			[EAnimationStates.IDLE]: '/images/Piranha.png',
			[EAnimationStates.ATTACK]: '/images/Piranha_Attack.png'
		},
		dice: [
			{
				faces: makeFaces(['d1', 'd1', 'd2', 'd2', 'dp4', 'dp4'])
			}
		]
	}
	return ret;
}

const createCatFish = () => {
	let ret:IPlayer = {
		name: 'Training Dummy',
		maxHealth: 6,
		health: 6,
		poison: 0,
		defense: 0,
		gold: 0,
		animationState: EAnimationStates.IDLE,
		animations: {
			[EAnimationStates.IDLE]: '/images/Catfish.png',
			[EAnimationStates.ATTACK]: '/images/Catfish_Attack.png'
		},
		dice: [
			{
				faces: makeFaces(['d1', 'd1', 'hc2', 'hc2', 's2', 's2'])
			}
		]
	}
	return ret;
}

const createEelBoss = () => {
	let ret:IPlayer = {
		name: 'Training Dummy',
		maxHealth: 20,
		health: 20,
		defense: 0,
		poison: 0,
		gold: 0,
		animationState: EAnimationStates.IDLE,
		animations: {
			[EAnimationStates.IDLE]: '/images/Eel.png',
			[EAnimationStates.ATTACK]: '/images/Eel_Attack.png'
		},
		dice: [
			{
				faces: makeFaces(['d5', 'd5', 'd7', 'h5', 'd3', 'd3'])
			},
			{
				faces: makeFaces(['b2', 'b2', 'b2', 's4', 's2', 's2'])
			},
		]
	}
	return ret;
}

export const waveInitEnemies: IPlayer[][] = [
	[
		createFishGoon()
	],
	[
		createFishGoon(),
		createFishGoon()
	],
	[
		createFishGoon(),
		createPiranha()
	],
	[
		createFishGoon(),
		createFishGoon(),
		createFishGoon()
	],
	[
		createFishGoon(),
		createFishGoon(),
		createCatFish()
	],
	[
		createPiranha(),
		createCatFish()
	],
	[
		createFishGoon(),
		createPiranha(),
		createCatFish()
	],
	[
		createPiranha(),
		createPiranha(),
		createCatFish()
	],
	[
		createPiranha(),
		createPiranha(),
		createPiranha(),
	],
	[
		createEelBoss()
	]
];

export const player = writable<IPlayer>({
	name: 'Roe',
	maxHealth: 30,
	health: 30,
	poison: 0,
	gold: 10,
	defense: 0,
	animationState: EAnimationStates.IDLE,
	animations: {
		[EAnimationStates.IDLE]: '/images/Fisher.png',
		[EAnimationStates.ATTACK]: '/images/Fisher_Attack.png'
	},
	dice: [
		{
			faces: makeFaces(['d1', 'd1', 'd2', 'd2', 'h1', 's1'])
		},
		{
			faces: makeFaces(['d1', 'd1', 'd2', 'd2', 'h1', 's1'])
		}
	]
});

export const enemies = writable<IPlayer[]>([
	{
		name: '2',
		maxHealth: 10,
		health: 10,
		gold: 0,
		poison: 0,
		defense: 0,
		animationState: EAnimationStates.IDLE,
		animations: {
			[EAnimationStates.IDLE]: 'test.jpg'
		},
		dice: [
			{
				faces: makeFaces(['d1', 'd1', 'd2', 'd2', 'h1', 's1'])
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

export const beRolling = writable(true);

export const audioList = writable<{ id: number; audio: string }[]>([]);
export const playAudio = (audio: string) => {
	audioList.update((old) => {
		old.push({ id: Math.random(), audio });
		while (old.length > 10) {
			old.shift();
		}
		return old;
	});
};
