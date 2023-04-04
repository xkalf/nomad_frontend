<script lang="ts">
	import { cubeType } from '$lib/stores/cubeType'
	import { scrambleMappper } from '$lib/utils/types'
	import type { ScrambleDisplay } from 'scramble-display'
	import { onMount } from 'svelte'

	export let scramble: string

	let container: HTMLDivElement
	let el: ScrambleDisplay

	onMount(async () => {
		const { ScrambleDisplay } = await import('scramble-display')
		el = new ScrambleDisplay()
		el.event = $cubeType
		el.visualization = $cubeType === 'Pyraminx' ? '2D' : '3D'
		el.style.width = '100%'
		el.style.maxHeight = '20vh'
		el.scramble = scramble

		container.appendChild(el)
	})

	$: if (el) {
		el.scramble = scramble
	}

	$: if (el) {
		el.event = scrambleMappper[$cubeType]
	}

	function onResize() {
		if (el) {
			el.style.width = '100%'
			el.style.maxHeight = '20vh'
		}
	}
</script>

<svelte:window on:resize={onResize} />

<div bind:this={container} />
