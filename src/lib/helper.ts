import { allAbilities } from './store';

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function rollDice(facesNum: number) {
	return Math.floor(Math.random() * facesNum);
}

export function getRandomAbility() {
	let probabilityArray = Object.keys(allAbilities).reduce((arr, key) => {
		arr.push(...new Array(allAbilities[key].rarity).fill(key));
		return arr;
	}, [] as number[]);

  const chosenNumber = Math.floor(Math.random()*probabilityArray.length);
  return allAbilities[probabilityArray[chosenNumber]];
}

const images: HTMLImageElement[] = [];
export function preload(urls: string[]) {
  for (let i = 0; i < urls.length; i++) {
    images[i] = new Image();
    images[i].src = urls[i];
  }
}