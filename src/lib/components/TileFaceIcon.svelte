<script lang="ts">
	export let icon: string;
	export let value: string;
	export let small: boolean = false;
</script>

<div class="icon" class:small={small}>
	<img src={icon} alt="" />
	<p>{value}</p>
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
</style>
