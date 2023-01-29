<script lang="ts">
	import { browser } from '$app/environment'
	import image from '$lib/assets/ads.png'
	import { onMount } from 'svelte'
	export let label: string
	export let deleteFunction: () => Promise<void>
	export let cancelFunction: () => void
	export let isOpen = false

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', e => {
				if (isOpen === true) {
					if (e.code === 'Enter') {
						deleteFunction()
					} else if (e.code === 'Escape') {
						cancelFunction()
					}
				}
			})
		}
	})
</script>

<div class={`modal p-12 pb-4 absolute top-1/2 left-1/2 ${isOpen ? 'block' : 'hidden'}`}>
	<img alt="ads" src={image} class="lg:w-[500px] lg:h-[500px] w-[400px] h-[400px]" />
	<p class="my-4 text-white text-xl text-center">{label}</p>
	<div class="flex justify-center gap-12 items-center">
		<button class="button py-2 px-4 text-xl text-white" on:click={cancelFunction}>Болих</button>
		<button class="button delete py-2 px-4 text-xl text-white" on:click={deleteFunction}
			>Устгах</button
		>
	</div>
</div>

<style>
	.modal {
		background: linear-gradient(107.59deg, #454f57 -2.1%, #384046 95.97%, #454f57 115.19%);
		box-shadow: -1.61258px -1.61258px 6.45031px rgba(255, 255, 255, 0.12),
			3.76268px 3.76268px 12.9006px rgba(0, 0, 0, 0.45);
		border-radius: 10px;
		transform: translate(-50%, -50%);
	}

	.button {
		background: linear-gradient(180deg, #363c41 29.35%, #1f252b 128.76%);
		border-radius: 10px;
	}

	.delete {
		border: 2px solid rgba(255, 123, 123, 0.56);
	}
</style>
