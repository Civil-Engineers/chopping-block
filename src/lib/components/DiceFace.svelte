<script lang="ts">
	import type { IFace } from '$lib/store';
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