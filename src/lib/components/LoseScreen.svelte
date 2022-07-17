
<div class="con">
  <h1>you lose...</h1>
  <button on:click={() => window.location.reload()}>retry</button>
</div>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  .con {
    width: 100%;
    height: 100%;
    background-color: cornsilk;
    padding: 1rem;
  }
	h1 {
		margin-top: 100px;
		text-align: center;
		font-size: 200px;
		margin-bottom: 30px;
	}
	button {
		display: block;
		margin-right: auto;
		margin-left: auto;
		font-size: 100px;
		border: none;
		border-radius: 30px;
		padding: 10px 30px;
    transition: .5s ease;
    &:hover {
      cursor: pointer;
      transform: translateY(-20px) rotate(-5deg)
    }
	}
</style>
