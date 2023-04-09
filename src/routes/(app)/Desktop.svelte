<script lang="ts">
	import timerLogo from '$lib/assets/timer-logo.webp'
	import Sidebar from './Sidebar.svelte'
	import { cubeType } from '$lib/stores/cubeType'
	import ScrambleDisplay from '$lib/components/ScrambleDisplay.svelte'
	import type { CubeType, Solve } from '@prisma/client'
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'
	import { settings } from '$lib/stores/settings'
	import { scrambleSizeMapper } from '$lib/utils/types'
	import { session } from '$lib/stores/session'
	import { addSolves } from '$lib/stores/solves'
	import { formatCustomTime } from '$lib/utils/timer-utils'

	export let timerText: string
	export let scramble: string
	export let textColor: string
	export let nextStatus: string
	export let changeCubeType: (type: CubeType) => Promise<void>
	export let eventUp: () => void
	export let eventDown: (s: boolean) => void
	export let newScramble: () => void
	export let createSolve: (time: number) => Promise<boolean>

	let timerContainer: HTMLDivElement
	let customTime: string | undefined = undefined
	let scrambleEl: HTMLSpanElement
	let timerEl: HTMLParagraphElement

	async function addCustomSolve() {
		if (!browser || !customTime) return
		const time = formatCustomTime(customTime)

		if (!time) {
			customTime = undefined
			return
		}

		const result = await createSolve(time)

		if (result) {
			newScramble()
			customTime = undefined
		}
	}

	onMount(() => {
		if (browser) {
			scrambleEl.style.fontSize = `${$settings.scrambleSize}px`
			timerEl.style.fontSize = `${$settings.timerSize}px`

			if ($settings.useMouseTimer && $settings.enteringTimes === 'Timer') {
				timerContainer.addEventListener('mousedown', () => {
					eventDown(true)
				})

				timerContainer.addEventListener('mouseup', () => {
					eventUp()
				})
			}
		}
	})
</script>

<div class="grid h-screen w-full grid-cols-[minmax(350px,_1fr)_4fr]">
	<Sidebar {changeCubeType} />
	<div bind:this={timerContainer} class="grid grid-rows-3 overflow-hidden bg-background p-4">
		<!-- Scramble -->
		<div class="flex items-center justify-center text-primary">
			<span
				bind:this={scrambleEl}
				class={`${scrambleSizeMapper[$cubeType]} whitespace-pre-line text-center`}
			>
				{scramble}
			</span>
		</div>
		<!-- Time -->
		<div class="relative">
			{#if $settings.enteringTimes !== 'Typing'}
				<p
					bind:this={timerEl}
					class={`${textColor} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[150px]`}
				>
					{timerText}
				</p>
				<p class="absolute top-1/2 right-2 -translate-y-1/2 text-7xl text-primary">
					{nextStatus}
				</p>
			{:else}
				<form class="flex items-center justify-center" on:submit|preventDefault={addCustomSolve}>
					<input
						bind:value={customTime}
						type="text"
						class="w-3/4 rounded-xl border border-primary px-4 py-2 text-center text-[150px] text-primary focus:outline-none"
					/>
				</form>
			{/if}
		</div>
		<!-- Bottom -->
		<div class="grid grid-cols-3 items-end justify-center gap-4">
			<div class="col-start-2 flex items-center justify-center pb-10">
				<img src={timerLogo} alt="Nomad Team" />
			</div>
			<!-- Tools -->
			<div class="col-start-3">
				<div class="z-20 ml-auto flex w-3/4 flex-col justify-between rounded-xl bg-secondary">
					<ScrambleDisplay {scramble} />
					<div class="flex items-center justify-center gap-2 px-2 py-4 text-lg">
						<span class="p-2 text-white">Function</span>
						<select class="rounded-xl bg-background p-2 text-black">
							<option>Draw Scramble</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
