<script lang="ts">
	import { browser } from '$app/environment'
	import image from '$lib/assets/ads.webp'
	import { onDestroy, onMount } from 'svelte'

	export let okFunction: () => Promise<void>
	export let isOpen = false
	export let mode: 'create' | 'delete' = 'delete'

	async function handleKeyDown(e: KeyboardEvent) {
		if (isOpen === true) {
			if (e.code === 'Enter') {
				await okFunction()
			} else if (e.code === 'Escape') {
				isOpen = false
			}
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeyDown)
		}
	})

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeyDown)
		}
	})
</script>

{#if isOpen}
	<div
		class="absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-70"
	>
		<div class="w-4/5 rounded-xl bg-background p-4 md:w-auto md:p-12 md:pb-4">
			<img alt="ads" src={image} class="mx-auto aspect-square w-[250px] md:w-[500px]" />
			<div class="my-4">
				<slot />
			</div>
			<div class="flex items-center justify-center gap-12">
				<button
					class="rounded-xl bg-primary py-2 px-4 text-xl text-white"
					on:click={() => (isOpen = false)}>Болих</button
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
{/if}
