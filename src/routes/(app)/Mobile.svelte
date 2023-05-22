<script lang="ts">
	import { scrambleSizeMapper } from '$lib/utils/types'
	import { checkBestAverage, getAvg, getBest } from '$lib/utils/timer-utils'
	import { solves } from '$lib/stores/solves'
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import MobileContainer from '$lib/components/pages/MobileContainer.svelte'
	import { cubeType } from '$lib/stores/cubeType'
	import ScrambleDisplay from '$lib/components/ScrambleDisplay.svelte'
	import ScrambleLogo from '$lib/icons/ScrambleLogo.svelte'
	import { bestSolve } from '$lib/stores/bestSolve'
	import { settings } from '$lib/stores/settings'

	export let timerText: string
	export let scramble: string
	export let textColor: string
	export let nextStatus: string

	export let timerEl: HTMLDivElement
	export let scrambleEl: HTMLDivElement
	let isScrambleDisplayOpen = false
	let timerP: HTMLParagraphElement
	let scrambleP: HTMLParagraphElement

	onMount(async () => {
		if (browser) {
			if (!$settings.defaultScrambleSize) {
				scrambleP.style.fontSize = `${$settings.scrambleSize}px`
			}
			timerP.style.fontSize = `${$settings.timerSize}px`
		}
	})
</script>

<MobileContainer>
	<div class="relative flex flex-grow touch-manipulation flex-col p-4">
		<div>
			<div
				bind:this={scrambleEl}
				class="mt-8 flex items-center justify-center text-center text-primary"
			>
				<p bind:this={scrambleP} class={`${scrambleSizeMapper[$cubeType]} whitespace-pre-line`}>
					{scramble}
				</p>
			</div>
		</div>
		<div bind:this={timerEl} class="flex flex-grow select-none flex-col">
			<div class="relative h-[40vh]">
				<p
					bind:this={timerP}
					class={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-7xl ${textColor}`}
				>
					{timerText}
				</p>
				<p class="absolute right-2 top-1/2 -translate-y-1/2 text-5xl text-primary">
					{nextStatus}
				</p>
			</div>
			<div class="flex flex-grow items-end justify-between">
				<div class="space-y-2 text-primary">
					<p>Best time: {getBest($bestSolve)}</p>
					<p class={`${checkBestAverage($solves, 5)}`}>
						Average of 5: {getAvg($solves, 5)}
					</p>
					<p class={`${checkBestAverage($solves, 12)}`}>
						Average of 12: {getAvg($solves, 12)}
					</p>
				</div>
				<button
					on:click={() => {
						isScrambleDisplayOpen = true
					}}
				>
					<ScrambleLogo />
				</button>
			</div>
		</div>
		<div
			class={`${
				isScrambleDisplayOpen ? 'block' : 'hidden'
			} absolute bottom-2 right-1/2 w-4/5 translate-x-[60%] bg-primary pb-4`}
		>
			<div class="relative">
				<button
					class="absolute top-0 right-0 z-20 p-4 text-2xl text-white"
					on:click={() => (isScrambleDisplayOpen = false)}>&#10005;</button
				>
				<ScrambleDisplay {scramble} />
			</div>
		</div>
	</div>
</MobileContainer>
