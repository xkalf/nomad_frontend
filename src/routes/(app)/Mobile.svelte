<script lang="ts">
	import logo from '$lib/assets/scramble-logo.png'
	import {
		cubeTypeMapper,
		cubeTypes,
		type CubeType,
		type SolveStatus,
		type StateType
	} from '$lib/utils/types'
	import { displayTime, formatMegaminxScramble, getAvg, getBest } from '$lib/utils/timer-utils'
	import { solves } from '$lib/stores/solves'
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import MobileContainer from '$lib/components/MobileContainer.svelte'
	import { cubeType } from '$lib/stores/cubeType'
	import ScrambleDisplay from '$lib/components/ScrambleDisplay.svelte'

	export let time: number
	export let scramble: string | null
	export let state: StateType
	export let startTime: () => void
	export let stopTime: () => Promise<void>
	export let updateState: (input: StateType) => void
	export let changeCubeType: (type: CubeType) => Promise<void>
	export let newScramble: () => Promise<void>
	export let getLastScramble: () => Promise<void>
	export let updateLastSolve: (status: SolveStatus) => Promise<void>
	export let openDeleteLastModal: () => void
	export let openDeleteAllModal: () => void

	let timerEl: HTMLDivElement
	let scrambleEl: HTMLDivElement
	let isCubeTypeOpen = false
	let isScrambleDisplayOpen = false
	let isStateOpen = false
	let timeOutRef: NodeJS.Timeout

	$: textColor =
		state === 'ready' ? 'text-green-500' : state === 'waiting' ? 'text-red-400' : 'text-white'

	const scrambleSizeMapper: Record<CubeType, string> = {
		'222': 'text-2xl',
		'333': 'text-2xl',
		'444': 'text-base',
		'555': 'text-sm',
		'666': 'text-xs',
		'777': 'text-xs',
		'333bf': 'text-2xl',
		'444bf': 'text-base',
		'555bf': 'text-sm',
		sq1: 'text-2xl',
		pyram: 'text-2xl',
		minx: 'text-sm',
		clock: 'text-2xl',
		skewb: 'text-2xl'
	}

	onMount(async () => {
		if (browser) {
			const Hammer = await import('hammerjs')
			const hammer = new Hammer.Manager(timerEl)
			const sHammer = new Hammer.Manager(scrambleEl)

			hammer.add(new Hammer.Tap({ event: 'doubleTap', taps: 2 }))
			hammer.add(new Hammer.Tap({ event: 'doubleMultiTap', pointers: 2, taps: 2 }))
			hammer.add(new Hammer.Swipe({ event: 'swipeRight', direction: Hammer.DIRECTION_RIGHT }))
			hammer.add(new Hammer.Swipe({ event: 'swipeLeft', direction: Hammer.DIRECTION_LEFT }))
			hammer.add(
				new Hammer.Swipe({ event: 'multiSwipeUp', direction: Hammer.DIRECTION_UP, pointers: 2 })
			)
			sHammer.add(new Hammer.Swipe({ event: 'swipeLeft', direction: Hammer.DIRECTION_LEFT }))
			sHammer.add(new Hammer.Swipe({ event: 'swipeRight', direction: Hammer.DIRECTION_RIGHT }))

			hammer.on('doubleTap', () => {
				isStateOpen = true
			})

			hammer.on('doubleMultiTap', () => {
				openDeleteAllModal()
			})

			hammer.on('swipeRight', async () => {
				await newScramble()
			})

			hammer.on('swipeLeft', () => {
				openDeleteLastModal()
			})

			hammer.on('multiSwipeUp', () => {
				isCubeTypeOpen = true
			})

			sHammer.on('swipeRight', async () => {
				await newScramble()
			})

			sHammer.on('swipeLeft', async () => {
				await getLastScramble()
			})

			timerEl.addEventListener('touchstart', e => {
				if (state === 'stopped') {
					updateState('waiting')
					timeOutRef = setTimeout(() => {
						updateState('ready')
					}, 300)
				}
			})

			timerEl.addEventListener('touchend', async () => {
				clearTimeout(timeOutRef)

				if (state === 'ready' && isCubeTypeOpen === false) {
					startTime()
					updateState('running')
				} else if (state === 'running') {
					stopTime()
					updateState('stopping')

					setTimeout(() => {
						updateState('stopped')
					}, 300)
				} else {
					updateState('stopped')
				}
			})
		}
	})
</script>

<MobileContainer>
	<div class="flex flex-grow flex-col p-4">
		<div>
			<div
				bind:this={scrambleEl}
				class={`${scrambleSizeMapper[$cubeType]} mt-8 flex items-center justify-center text-center text-[#b8b8b8]`}
			>
				<p class={`${$cubeType === 'minx' && 'text-justify'}`}>
					{#if !scramble}
						Холилт хийж байна
					{:else if $cubeType === 'minx'}
						{@html formatMegaminxScramble(scramble)}
					{:else}
						{scramble}
					{/if}
				</p>
			</div>
		</div>
		<div bind:this={timerEl} class="flex flex-grow select-none flex-col">
			<div class="flex h-[40vh] items-center justify-center">
				<p class={`font-mono text-7xl ${textColor}`}>{displayTime(time)}</p>
			</div>
			<div class="flex flex-grow items-end justify-between">
				<div class="space-y-2 text-[#b8b8b8]">
					<p>Best time: {getBest($solves)}</p>
					<p>
						Average of 5:
						{#if $solves.length >= 5}
							{getAvg($solves, 5)}
						{:else}
							{displayTime(0)}
						{/if}
					</p>
					<p>
						Average of 12:
						{#if $solves.length >= 12}
							{getAvg($solves, 12)}
						{:else}
							{displayTime(0)}
						{/if}
					</p>
				</div>
				<button
					on:click={() => {
						isScrambleDisplayOpen = true
					}}
					class="flex items-end justify-end"
				>
					<img class="w-12" src={logo} alt="scramble logo" />
				</button>
			</div>
		</div>
	</div>
	<div
		class={`${
			isScrambleDisplayOpen ? 'block' : 'hidden'
		} absolute bottom-20 right-1/2 w-4/5 translate-x-[60%] bg-[#3A3E42]`}
	>
		<div class="flex w-full items-center justify-end text-2xl text-white">
			<button class="p-4" on:click={() => (isScrambleDisplayOpen = false)}>X</button>
		</div>
		<ScrambleDisplay {scramble} mobile />
	</div>
</MobileContainer>

<div class={`${isCubeTypeOpen ? 'block' : 'hidden'} modal w-64 text-center text-2xl text-white`}>
	<ul class="scrollbar max-h-64 overflow-y-auto rounded-xl bg-[#040404]">
		{#each cubeTypes as type}
			<li class="py-3">
				<button
					class="w-full"
					on:click={() => {
						changeCubeType(type)
						isCubeTypeOpen = false
					}}>{cubeTypeMapper[type]}</button
				>
			</li>
		{/each}
	</ul>

	<button
		class="mt-2 w-full rounded-xl bg-[#040404] py-3 text-white"
		on:click={() => {
			isCubeTypeOpen = false
		}}>Cancel</button
	>
</div>

<div class={`${isStateOpen ? 'block' : 'hidden'} modal w-64 text-center text-2xl text-white`}>
	<ul class="scrollbar max-h-64 overflow-y-auto rounded-xl bg-[#040404]">
		<li class="py-3">
			<button
				class="w-full"
				on:click={async () => {
					await updateLastSolve('+2')
					isStateOpen = false
				}}>+2</button
			>
		</li>
		<li class="py-3">
			<button
				class="w-full"
				on:click={async () => {
					await updateLastSolve('dnf')
					isStateOpen = false
				}}>DNF</button
			>
		</li>
		<li class="py-3">
			<button
				class="w-full"
				on:click={async () => {
					await updateLastSolve('ok')
					isStateOpen = false
				}}>OK</button
			>
		</li>
	</ul>

	<button
		class="mt-2 w-full rounded-xl bg-[#040404] py-3 text-white"
		on:click={() => {
			isStateOpen = false
		}}>Cancel</button
	>
</div>

<style>
	.modal {
		top: 50%;
		left: 50%;
		position: absolute;
		transform: translate(-50%, -50%);
	}
</style>
