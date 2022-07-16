import { writable } from 'svelte/store';

export enum EGlobalStates {
	START_SCREEN,
	STORE,
	BATTLE
}

export interface IFace {
	ability: IAbility;
}
export interface IDice {
	faces: IFace[];
}
export interface Player {
	health: number;
	gold: number;
	dice: IDice[];
}

export interface IAbility {
	icon: string;

  // applies to the other player, can be negative to heal
	damage: number;

  // remove form attack damage value to a limit of 0
	defense: number;

  // applies to player health, can be negative
	heal: number;

	multiplier: number;
}

export const globalGameState = writable<EGlobalStates>(EGlobalStates.START_SCREEN);
