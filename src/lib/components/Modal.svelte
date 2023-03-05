<script lang="ts">
	import { browser } from '$app/environment'
	import image from '$lib/assets/ads.webp'
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

<div class={`absolute top-0 left-0 w-full flex h-screen items-center justify-center ${isOpen ? "block" : 'hidden'} bg-black bg-opacity-50 z-50`}>
	<div
		class="rounded-xl bg-background p-12 pb-4"
	>
		<img alt="ads" src={image} class="h-[250px] w-[250px] md:h-[500px] md:w-[500px]" />
		<div class="my-4">
			<slot />
		</div>
		<div class="flex items-center justify-center gap-12">
			<button class="rounded-xl bg-primary py-2 px-4 text-xl text-white" on:click={cancelFunction}
				>Болих</button
			>
			<button class="rounded-xl bg-primary py-2 px-4 text-xl text-white" on:click={okFunction}>
				{#if mode === 'create'}
					Үүсгэх
				{:else if mode === 'delete'}
					Устгах
				{/if}
			</button>
		</div>
	</div>
</div>
