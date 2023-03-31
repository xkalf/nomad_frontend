<script lang="ts">
	import { cubeTypeMapper, cubeTypes, scrambleSizeMapper, type StateType } from '$lib/utils/types'
	import { checkBestAverage, formatCustomTime, getAvg, getBest } from '$lib/utils/timer-utils'
	import { solves } from '$lib/stores/solves'
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import MobileContainer from '$lib/components/MobileContainer.svelte'
	import { cubeType } from '$lib/stores/cubeType'
	import ScrambleDisplay from '$lib/components/ScrambleDisplay.svelte'
	import Modal from '$lib/components/Modal.svelte'
	import type { CubeType, SolveStatus } from '@prisma/client'
	import ScrambleLogo from '$lib/components/ScrambleLogo.svelte'
	import { bestSolve } from '$lib/stores/bestSolve'

	export let timerText: string
	export let scramble: string
	export let state: StateType
	export let textColor: string
	export let changeCubeType: (type: CubeType) => Promise<void>
	export let newScramble: () => void
	export let getLastScramble: () => void
	export let updateLastSolve: (status: SolveStatus) => Promise<void>
	export let openDeleteLastModal: () => void
	export let openDeleteAllModal: () => void
	export let createSolve: (time: number) => Promise<void>
	export let eventDown: (s: boolean) => void
	export let eventUp: () => void
	export let nextStatus: string

	let timerEl: HTMLDivElement
	let scrambleEl: HTMLDivElement
	let isCubeTypeOpen = false
	let isScrambleDisplayOpen = false
	let isStateOpen = false
	let customTime: string | undefined = undefined
	let isCustomTimeModalOpen = false

	async function createCustomSolve() {
		if (!customTime) return
		const time = formatCustomTime(customTime)

		if (!time) return

		await createSolve(time)
		newScramble()
		isCustomTimeModalOpen = false
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
				const states: StateType[] = ['stopped', 'waiting', 'inspectionWaiting']
				return states.includes(state)
			}

			hammer.on('doubleTap', e => {
				e.preventDefault()
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
					customTime = undefined
					isCustomTimeModalOpen = true
				}
			})

			sHammer.on('swipeRight', () => {
				if (isReady()) newScramble()
			})

			sHammer.on('swipeLeft', () => {
				if (isReady()) getLastScramble()
			})

			timerEl.addEventListener('touchstart', () => {
				eventDown(true)
			})

			timerEl.addEventListener('touchend', () => {
				eventUp()
			})
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
				<p class={`${scrambleSizeMapper[$cubeType]} whitespace-pre-line`}>
					{scramble}
				</p>
			</div>
		</div>
		<div bind:this={timerEl} class="flex flex-grow select-none flex-col">
			<div class="relative h-[40vh]">
				<p
					class={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-7xl ${textColor}`}
				>
					{timerText}
				</p>
				<p class="absolute top-1/2 right-2 -translate-y-1/2 text-5xl text-primary">
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
					class="absolute right-0 top-0 z-20 p-4 text-2xl text-white"
					on:click={() => (isScrambleDisplayOpen = false)}>&#10005;</button
				>
				<ScrambleDisplay {scramble} />
			</div>
		</div>
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
		type="string"
		inputmode="numeric"
	/>
</Modal>

<div class={`${isCubeTypeOpen ? 'block' : 'hidden'} modal w-64 text-center text-2xl text-primary`}>
	<ul class="max-h-64 overflow-y-auto rounded-xl bg-white">
		{#each cubeTypes as type}
			<li class="border-b border-secondary py-3 last:border-none">
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
		class="mt-2 w-full rounded-xl bg-white py-3"
		on:click={() => {
			isCubeTypeOpen = false
		}}>Cancel</button
	>
</div>

<div class={`${isStateOpen ? 'block' : 'hidden'} modal w-64 text-center text-2xl text-primary`}>
	<ul class="max-h-64 overflow-y-auto rounded-xl bg-white">
		<li class="border-b border-secondary py-3">
			<button
				class="w-full"
				on:click={async () => {
					await updateLastSolve('Plus2')
					isStateOpen = false
				}}>+2</button
			>
		</li>
		<li class="border-b border-secondary py-3">
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
		class="mt-2 w-full rounded-xl bg-white py-3"
		on:click={() => {
			isStateOpen = false
		}}>Cancel</button
	>
</div>

<style>
	.modal {
		@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
	}
</style>
