export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function rollDice(facesNum: number) {
	return Math.floor(Math.random() * facesNum);
}
