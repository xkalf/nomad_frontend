<script lang="ts">
	import { browser } from '$app/environment'
	import image from '$lib/assets/ads.png'
	import { onMount } from 'svelte'

	export let okFunction: () => Promise<void>
	export let cancelFunction: () => void
	export let isOpen = false
	export let mode: 'create' | 'delete' = 'delete'

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', async e => {
				if (isOpen === true) {
					if (e.code === 'Enter') {
						await okFunction()
					} else if (e.code === 'Escape') {
						cancelFunction()
					}
				}
			})
		}
	})
</script>

<div class={`modal absolute top-1/2 left-1/2 z-50 p-12 pb-4 ${isOpen ? 'block' : 'hidden'}`}>
	<img alt="ads" src={image} class="h-[250px] w-[250px] md:h-[500px] md:w-[500px]" />
	<div class="my-4">
		<slot />
	</div>
	<div class="flex items-center justify-center gap-12">
		<button class="button py-2 px-4 text-xl text-white" on:click={cancelFunction}>Болих</button>
		<button class="button py-2 px-4 text-xl text-white" on:click={okFunction}>
			{#if mode === 'create'}
				Үүсгэх
			{:else if mode === 'delete'}
				Устгах
			{/if}
		</button>
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
</style>
