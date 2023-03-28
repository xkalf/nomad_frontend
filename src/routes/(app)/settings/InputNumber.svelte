<script lang="ts">
	export let value: number
	export let min = 0
	export let max = 0

	function decrease() {
		if (value > min) value -= 1
	}

	function increase() {
		if (value < max) value += 1
	}
</script>

<div class="flex justify-between rounded-md bg-white">
	<button class="py-2 px-4" on:click={decrease}>-</button>
	<input
		type="number"
		class="w-2/5 appearance-none text-center focus:outline-none md:p-2"
		bind:value
	/>
	<button class="rounded-tr-md rounded-br-md bg-white py-2 px-4" on:click={increase}>+</button>
</div>

<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		appearance: none;
	}
</style>
