<script lang="ts">
	import { sleep } from '$lib/helper';

	//Alvin Please do something with this
	let shouldBeRolling = true;
    let rampTime = 10;
	//Alvin handle passing pls
	let colorMap = new Map();
	colorMap.set(1, 'red-dice');
	colorMap.set(2, 'green-dice');
	colorMap.set(3, 'blue-dice');
	colorMap.set(4, 'purple-dice');
	colorMap.set(5, 'orange-dice');
	colorMap.set(6, 'yellow-dice');

	//Alvin Fix this later
	$: waitSpeed = 5;
	let colorClass = 'red-dice';
    let xMargin = 0;
    let yMargin = 0;
    const diceLoop = async () => {
			await sleep(waitSpeed);
			colorClass = colorMap.get(Math.floor(Math.random() * 6 + 1));
			waitSpeed = waitSpeed + rampTime;
            rampTime = rampTime + 5;
            xMargin = Math.floor(Math.random() * 20 - 10);
            yMargin = Math.floor(Math.random() * 20 - 10);
			if (waitSpeed > 250) {
				shouldBeRolling = false;
			}
            if (!shouldBeRolling) {
                xMargin = 0;
                yMargin = 0;
                return;
            }
			diceLoop();
		};


    diceLoop();
	
</script>

<div class={colorClass} style={`transform: translate(${xMargin}px, ${yMargin}px)`}/>

<style>
	.red-dice {
		width: 25px;
		height: 25px;
		background-color: #ff0000;
        transition: 0.1s ease;
		padding: 1px;
		gap: 20px;
	}
	.green-dice {
		width: 25px;
		height: 25px;
		background-color: #008000;
        transition: 0.1s ease;
		padding: 1px;
		gap: 20px;
	}
	.blue-dice {
		width: 25px;
		height: 25px;
		background-color: #0000ff;
        transition: 0.1s ease;
		padding: 1px;
		gap: 20px;
	}
	.purple-dice {
		width: 25px;
		height: 25px;
		background-color: #800080;
        transition: 0.1s ease;
		padding: 1px;
		gap: 20px;
	}
	.orange-dice {
		width: 25px;
		height: 25px;
		background-color: #ffa500;
        transition: 0.1s ease;
		padding: 1px;
		gap: 20px;
	}
	.yellow-dice {
		width: 25px;
		height: 25px;
		background-color: #ffff00;
        transition: 0.1s ease;
		padding: 1px;
		gap: 20px;
	}
</style>
