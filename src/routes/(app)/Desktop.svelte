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

	let timerEl: HTMLDivElement
	let customTime: string | undefined = undefined

	async function addCustomSolve() {
		if (!browser || !customTime) return
		const time = formatCustomTime(customTime)

		if (!time) {
			customTime = undefined
			return
		}

		const response = await fetch('/api/solve', {
			method: 'POST',
			body: JSON.stringify({
				time,
				scramble,
				sessionId: $session.id
			})
		})

		const result: Solve = await response.json()

		addSolves(result)
		newScramble()
		customTime = undefined
	}

	onMount(() => {
		if (browser && $settings.useMouseTimer && $settings.enteringTimes === 'Timer') {
			timerEl.addEventListener('mousedown', e => {
				eventDown(true)
			})

			timerEl.addEventListener('mouseup', async e => {
				eventUp()
			})
		}
	})
</script>

<div class="grid h-screen w-full grid-cols-[minmax(350px,_1fr)_4fr]">
	<Sidebar {changeCubeType} />
	<div bind:this={timerEl} class="grid grid-rows-3 overflow-hidden bg-background p-4">
		<!-- Scramble -->
		<div class="flex justify-center pt-20 text-center text-primary">
			<p class={`${scrambleSizeMapper[$cubeType]} whitespace-pre-line`}>
				{scramble}
			</p>
		</div>
		<!-- Time -->
		<div class="relative">
			{#if $settings.enteringTimes !== 'Typing'}
				<p
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
						class="w-3/4 rounded-xl border border-primary px-4 py-2 text-[150px] text-primary focus:outline-none"
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
					<div class="flex items-center justify-around p-3">
						<span class="py-2 text-xl text-white">Function</span>
						<select class="rounded-xl bg-background py-2 px-4 text-xl text-black">
							<option>Draw Scramble</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
