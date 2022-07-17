<script lang="ts">
import { sleep } from "$lib/helper";

    //Alvin Please do something with this
    let shouldBeRolling = false;

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
    const diceLoop = async () => {
        await sleep(waitSpeed);
        colorClass = colorMap.get(Math.floor(Math.random() * 6 + 1));
        diceLoop();
    }   
    diceLoop();
</script>

<div class={colorClass}>
</div>

<style>
.red-dice {
    width: 25px;
    height: 25px;
    background-color: #ff0000;
    padding: 1px;
    gap: 20px;
}
.green-dice{
    width: 25px;
    height: 25px;
    background-color: #008000;
    padding: 1px;
    gap: 20px;
}
.blue-dice{
    width: 25px;
    height: 25px;
    background-color: #0000FF;
    padding: 1px;
    gap: 20px;
}
.purple-dice{
    width: 25px;
    height: 25px;
    background-color: #800080;
    padding: 1px;
    gap: 20px;
}
.orange-dice{
    width: 25px;
    height: 25px;
    background-color: #FFA500;
    padding: 1px;
    gap: 20px;
}
.yellow-dice{
    width: 25px;
    height: 25px;
    background-color: #FFFF00;
    padding: 1px;
    gap: 20px;
}
</style>