import { writable } from 'svelte/store';

export enum EGlobalStates {
	START_SCREEN,
	STORE,
	BATTLE
}

export interface Face {
	icon: string;
	eventHandler: () => void;
}
export interface Dice {
	faces: Face[];
}

export interface Ability {
	damage: number;
	defense?: number;
	multiplier?: number;
}

export const globalGameState = writable<EGlobalStates>(EGlobalStates.START_SCREEN);
