<script lang="ts">
	import { audioList, playAudio, type IFace } from '$lib/store';
	import { isShopping, selectedShopFace, allAbilities, shopBuy } from '$lib/store';
	import TileFaceIcon from './TileFaceIcon.svelte';

	export let face: IFace;
	// export let inShop: boolean;
	// $: scale = health / maxHealth * 100;
	let trySetNewFace = () => {
		$selectedShopFace = $selectedShopFace;
		$isShopping = $isShopping;
		if (isShopping && $selectedShopFace) {
			face.ability = allAbilities[$selectedShopFace];
			$selectedShopFace = '';
			$shopBuy = true;
			playAudio('/music/cash-register.mp3');
		} else {
			playAudio('/music/error.wav');
		}
	};
</script>

<div
	on:click={() => {
		trySetNewFace();
	}}
>
	<TileFaceIcon icon={face.ability.icon} value={face.ability.value} small={true}/>
</div>