<script lang="ts">
	import { settings } from '$lib/stores/settings'
	import Icon from '@iconify/svelte'
	import { onMount } from 'svelte'

	let zoom = 100

	onMount(() => {
		if ($settings) {
			if ($settings.displaySettings?.zoom) {
				zoom = $settings.displaySettings.zoom
			}
		}
	})
</script>

<h1 class="text-4xl text-white">Display</h1>

<div class="mt-8 grid grid-cols-6 bg-mainBg">
	<div class="relative rounded-lg bg-sidebarBg p-4 text-white">
		<Icon icon="bi:question-circle" class="absolute right-3 top-3" />
		<p class="my-2 text-center text-2xl">Zoom</p>
		<div class="flex gap-2">
			<span class="font-mono">{zoom}%</span>
			<input type="range" bind:value={zoom} class="zoom" />
		</div>
	</div>
</div>

<style>
	.zoom {
		height: 38px;
	}
	.zoom::-webkit-slider-thumb {
		background: #fafaf9;
	}
</style>
