<script lang="ts">
	import { cubeType } from '$lib/stores/cubeType'
	import { onMount } from 'svelte'

	export let scramble: string | null

	let container: HTMLDivElement
	let el: any

	onMount(async () => {
		const { ScrambleDisplay } = await import('scramble-display')
		el = new ScrambleDisplay()
		el.event = $cubeType
		el.visualization = $cubeType === 'pyram' ? '2D' : '3D'
		el.style.width = '100%'
		el.scramble = scramble

		container.appendChild(el)
	})

	$: if (el) {
		el.scramble = scramble
	}

	$: if (el) {
		el.event = $cubeType
	}
</script>

<div bind:this={container} />

<!-- <scramble-display
	style="width: 100%;"
	{scramble}
	event={$cubeType}
	visualization={mobile ? '2D' : $cubeType === 'pyram' ? '2D' : '3D'}
/> -->
