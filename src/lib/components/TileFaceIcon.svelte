<script lang="ts">
	import type { IAbility, IFace } from "$lib/store";
import { each } from "svelte/internal";
	export let ability: IAbility;
	export let temp: IAbility | undefined = undefined;
	export let small: boolean = false
	export let smaller: boolean = false
	

	const getSum = (key: keyof IAbility) => {
		const x = ability[key];
		if(temp && typeof temp !== "undefined") {
			const y = temp[key];
			if(typeof x === "number" && typeof y === "number") {
				return ""+(x+y);
			}
		}
		return ""+x;
	}

	const display = (text: string) => {
		let display = text;
		display = display.replaceAll("%d", getSum("damage"));
		display = display.replaceAll("%cd", getSum("cleaveDamage"));
		display = display.replaceAll("%h", getSum("heal"));
		display = display.replaceAll('%b', getSum("block"));
		return display;
	}
</script>

<div class="icon" class:small={small && !smaller} class:smallest={smaller}>
	<img src={ability.icon} alt="" />
	<div>
		{#if ability.reroll > ability.rerollCount} 
			<img class="reroll-icon" src={'/images/Reroll_Status_Icon.png'} alt="">
		{/if}
	</div>
	<p>{display(ability.value)}</p>
</div>

<style lang="scss">
  
	.icon {
		width: 200px;
		height: 200px;
		position: relative;
		> img {
			width: 100%;
			height: 100%;
		}
		> p {
			position: absolute;
			bottom: 30px;
			margin: 0;
			right: 50px;
			color: white;
			font-size: 50px;
			text-shadow: -2px -2px 0 #391302, 2px -2px 0 #391302, -2px 2px 0 #391302, 2px 2px 0 #391302;
		}
	}
	
	.reroll-icon {
		position: absolute;
		right: 20px;
		top: 25px;
		width: 10px;
	}
  .small {
    width: 100px;
		height: 100px;
    > p {
      position: absolute;
      bottom: 18px;
      margin: 0;
      right: 25px;
      color: white;
      font-size: 20px;
      text-shadow: -1px -1px 0 #391302, 1px -1px 0 #391302, -1px 1px 0 #391302, 1px 1px 0 #391302;
    }
  }
  .smaller {
    width: 75px;
	height: 75px;
    > p {
      position: absolute;
      bottom: 9px;
      margin: 0;
      right: 16px;
      color: white;
      font-size: 20px;
      text-shadow: -1px -1px 0 #391302, 1px -1px 0 #391302, -1px 1px 0 #391302, 1px 1px 0 #391302;
    }
  }
  .smallest {
    width: 50px;
	height: 50px;
    > p {
      position: absolute;
      bottom: 6px;
      margin: 0;
      right: 11px;
      color: white;
      font-size: 15px;
      text-shadow: -1px -1px 0 #391302, 1px -1px 0 #391302, -1px 1px 0 #391302, 1px 1px 0 #391302;
    }
  }
</style>
