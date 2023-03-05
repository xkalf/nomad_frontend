<script lang="ts">
	import { cubeType } from '$lib/stores/cubeType'
	import { scrambleMappper } from '$lib/utils/types'
	import { onMount } from 'svelte'

	export let scramble: string

	let container: HTMLDivElement
	let el: any

	onMount(async () => {
		const { ScrambleDisplay } = await import('scramble-display')
		el = new ScrambleDisplay()
		el.event = $cubeType
		el.visualization = $cubeType === 'Pyraminx' ? '2D' : '3D'
		el.style.width = '100%'
		el.scramble = scramble

		container.appendChild(el)
	})

	$: if (el) {
		el.scramble = scramble
	}

	$: if (el) {
		el.event = scrambleMappper[$cubeType]
	}
</script>

<div bind:this={container} />
