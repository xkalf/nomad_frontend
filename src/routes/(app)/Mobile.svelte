<script lang="ts">
	import logo from '$lib/assets/scramble-logo.webp'
	import { cubeTypeMapper, cubeTypes, type StateType } from '$lib/utils/types'
	import {
		displayTime,
		formatMegaminxScramble,
		formatTimeInput,
		getAvg,
		getBest
	} from '$lib/utils/timer-utils'
	import { solves } from '$lib/stores/solves'
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import MobileContainer from '$lib/components/MobileContainer.svelte'
	import { cubeType } from '$lib/stores/cubeType'
	import ScrambleDisplay from '$lib/components/ScrambleDisplay.svelte'
	import Modal from '$lib/components/Modal.svelte'
	import type { CubeType, SolveStatus } from '@prisma/client'

	export let time: number
	export let scramble: string
	export let state: StateType
	export let startTime: () => void
	export let stopTime: () => Promise<void>
	export let updateState: (input: StateType) => void
	export let changeCubeType: (type: CubeType) => Promise<void>
	export let newScramble: () => void
	export let getLastScramble: () => Promise<void>
	export let updateLastSolve: (status: SolveStatus) => Promise<void>
	export let openDeleteLastModal: () => void
	export let openDeleteAllModal: () => void
	export let createSolve: (time: number) => Promise<void>

	let timerEl: HTMLDivElement
	let scrambleEl: HTMLDivElement
	let isCubeTypeOpen = false
	let isScrambleDisplayOpen = false
	let isStateOpen = false
	let timeOutRef: NodeJS.Timeout
	let customTime: number
	let isCustomTimeModalOpen = false

	async function createCustomSolve() {
		Promise.all([createSolve(formatTimeInput(customTime)), newScramble()])
		isCustomTimeModalOpen = false
	}

	$: textColor =
		state === 'ready' ? 'text-green-500' : state === 'waiting' ? 'text-red-400' : 'text-primary'

	const scrambleSizeMapper: Record<CubeType, string> = {
		N2: 'text-2xl',
		N3: 'text-2xl',
		N4: 'text-base',
		N5: 'text-sm',
		N6: 'text-xs',
		N7: 'text-xs',
		Bld3: 'text-2xl',
		Bld4: 'text-base',
		Bld5: 'text-sm',
		Sq1: 'text-2xl',
		Pyraminx: 'text-2xl',
		Megaminx: 'text-sm text-justify font-mono',
		Clock: 'text-2xl',
		Skewb: 'text-2xl'
	}

	onMount(async () => {
		if (browser) {
			const Hammer = await import('hammerjs')
			const hammer = new Hammer.Manager(timerEl)
			const sHammer = new Hammer.Manager(scrambleEl)

			hammer.add(new Hammer.Tap({ event: 'doubleTap', taps: 2, interval: 700 }))
			hammer.add(new Hammer.Tap({ event: 'doubleMultiTap', pointers: 2, taps: 2, interval: 700 }))
			hammer.add(new Hammer.Swipe({ event: 'swipeRight', direction: Hammer.DIRECTION_RIGHT }))
			hammer.add(new Hammer.Swipe({ event: 'swipeLeft', direction: Hammer.DIRECTION_LEFT }))
			hammer.add(
				new Hammer.Swipe({ event: 'multiSwipeUp', direction: Hammer.DIRECTION_UP, pointers: 2 })
			)
			hammer.add(new Hammer.Swipe({ event: 'swipeDown', direction: Hammer.DIRECTION_DOWN }))

			sHammer.add(new Hammer.Swipe({ event: 'swipeLeft', direction: Hammer.DIRECTION_LEFT }))
			sHammer.add(new Hammer.Swipe({ event: 'swipeRight', direction: Hammer.DIRECTION_RIGHT }))

			function isReady() {
				return state === 'stopped' || state === 'waiting'
			}

			hammer.on('doubleTap', () => {
				if (isReady()) isStateOpen = true
			})

			hammer.on('doubleMultiTap', () => {
				if (isReady()) openDeleteAllModal()
			})

			hammer.on('swipeRight', () => {
				if (isReady()) newScramble()
			})

			hammer.on('swipeLeft', () => {
				if (isReady()) openDeleteLastModal()
			})

			hammer.on('multiSwipeUp', () => {
				if (isReady()) isCubeTypeOpen = true
			})

			hammer.on('swipeDown', () => {
				if (isReady()) {
					customTime = 0
					isCustomTimeModalOpen = true
				}
			})

			sHammer.on('swipeRight', () => {
				if (isReady()) newScramble()
			})

			sHammer.on('swipeLeft', async () => {
				if (isReady()) await getLastScramble()
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
				class={`mt-8 flex items-center justify-center text-center text-primary`}
			>
				<p class={`${scrambleSizeMapper[$cubeType]}`}>
					{#if $cubeType === 'Megaminx'}
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
				<div class="space-y-2 text-primary">
					<p>Best time: {getBest($solves)}</p>
					<p>
						Average of 5: {getAvg($solves, 5)}
					</p>
					<p>
						Average of 12: {getAvg($solves, 12)}
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
		} absolute bottom-20 right-1/2 w-4/5 translate-x-[60%] bg-primary pb-4`}
	>
		<div class="flex w-full items-center justify-end text-2xl text-white">
			<button class="p-4" on:click={() => (isScrambleDisplayOpen = false)}>X</button>
		</div>
		<ScrambleDisplay {scramble} />
	</div>
</MobileContainer>

<Modal
	okFunction={createCustomSolve}
	isOpen={isCustomTimeModalOpen}
	cancelFunction={() => (isCustomTimeModalOpen = false)}
	mode="create"
>
	<p class="text-lg text-primary">Эвлүүлэлтийн хугацаа</p>
	<input
		bind:value={customTime}
		class="mt-2 w-full rounded-lg bg-secondary p-2 pl-3 text-lg text-white"
		type="number"
	/>
</Modal>

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
					await updateLastSolve('Plus2')
					isStateOpen = false
				}}>+2</button
			>
		</li>
		<li class="py-3">
			<button
				class="w-full"
				on:click={async () => {
					await updateLastSolve('Dnf')
					isStateOpen = false
				}}>DNF</button
			>
		</li>
		<li class="py-3">
			<button
				class="w-full"
				on:click={async () => {
					await updateLastSolve('Ok')
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
