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
	maxHealth: number;
	health: number;
	gold: number;
	dice: IDice[];
}

export interface IAbility {
	// 1 - 0, 1 = not rare at all
	rarity: number;

	name: string;
	icon: string;

	// applies to the other player, can be negative to heal
	damage: number;

	// remove form attack damage value to a limit of 0
	defense: number;

	// applies to player health, can be negative
	heal: number;

	multiplier: number;
}

export const allAbilities: IAbility[] = [
	{
		name: 'test ability',
		rarity: 1,
		icon: '',
		damage: 10,
		defense: 0,
		heal: 0,
		multiplier: 0
	}
];

export const player = writable<IPlayer>({
	maxHealth: 30,
	health: 10,
	gold: 0,
	dice: []
});
export const enemies = writable<IPlayer[]>([
	{
		maxHealth: 30,
		health: 20,
		gold: 0,
		dice: []
	},
	{
		maxHealth: 30,
		health: 20,
		gold: 0,
		dice: []
	}
]);

export const globalGameState = writable<EGlobalStates>(EGlobalStates.START_SCREEN);
