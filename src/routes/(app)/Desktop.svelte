<script lang="ts">
	import timerLogo from '$lib/assets/timer-logo.webp'
	import Sidebar from './Sidebar.svelte'
	import { cubeType } from '$lib/stores/cubeType'
	import ScrambleDisplay from '$lib/components/ScrambleDisplay.svelte'
	import type { CubeType } from '@prisma/client'
	import { onDestroy, onMount } from 'svelte'
	import { browser } from '$app/environment'
	import { settings } from '$lib/stores/settings'
	import { scrambleSizeMapper } from '$lib/utils/types'
	import { formatCustomTime } from '$lib/utils/timer-utils'
	import GanTimer from '$lib/components/GanTimer.svelte'

	export let timerText: string
	export let scramble: string
	export let textColor: string
	export let nextStatus: string
	export let changeCubeType: (type: CubeType) => Promise<void>
	export let eventUp: () => void
	export let eventDown: (s: boolean) => void
	export let newScramble: () => void
	export let createSolve: (time: number) => Promise<boolean>
	export let connectBluetoothTimer: () => Promise<void>

	export let timerContainer: HTMLDivElement
	export let scrambleContainer: HTMLDivElement
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

	function handleMouseDown() {
		eventDown(true)
	}

	function handleMouseUp() {
		eventUp()
	}

	const options = [
		{
			label: 'Холилтийн зураг',
			component: ScrambleDisplay,
			props: { scramble }
		},
		{
			label: 'Gan Timer',
			component: GanTimer,
			props: {
				connectTimer: async () => {
					await connectBluetoothTimer()
					selectedValue = options[0]
				}
			}
		}
	]

	let selectedValue: (typeof options)[number] = options[0]

	onMount(() => {
		if (browser) {
			if (!$settings.defaultScrambleSize) {
				scrambleEl.style.fontSize = `${$settings.scrambleSize * 2}px`
			}
			if ($settings.enteringTimes !== 'Typing') {
				timerEl.style.fontSize = `${$settings.timerSize * 2}px`
			}

			if ($settings.useMouseTimer && $settings.enteringTimes === 'Timer') {
				timerContainer.addEventListener('mousedown', handleMouseDown)

				timerContainer.addEventListener('mouseup', handleMouseUp)
			}
		}
	})

	onDestroy(() => {
		if (browser) {
			timerContainer.removeEventListener('mousedown', handleMouseDown)
			timerContainer.removeEventListener('mouseup', handleMouseUp)
		}
	})
</script>

<div
	class="grid h-screen w-full grid-cols-[minmax(320px,_1fr)_3fr] xl:grid-cols-[minmax(350px,_1fr)_4fr]"
>
	<Sidebar {changeCubeType} />
	<div class="grid overflow-hidden grid-rows-3 p-4 bg-background">
		<!-- Scramble -->
		<div bind:this={scrambleContainer} class="flex justify-center items-center text-primary">
			<span
				bind:this={scrambleEl}
				class={`${scrambleSizeMapper[$cubeType]} whitespace-pre-line text-center`}
			>
				{scramble}
			</span>
		</div>
		<!-- Time -->
		<div bind:this={timerContainer} class="relative">
			{#if $settings.enteringTimes !== 'Typing'}
				<p
					bind:this={timerEl}
					class={`${textColor} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[150px]`}
				>
					{timerText}
				</p>
				<p class="absolute right-2 top-1/2 text-7xl -translate-y-1/2 text-primary">
					{nextStatus}
				</p>
			{:else}
				<form class="flex justify-center items-center" on:submit|preventDefault={addCustomSolve}>
					<input
						bind:value={customTime}
						type="text"
						class="py-2 px-4 w-3/4 text-center rounded-xl border focus:outline-none border-primary text-[150px] text-primary"
					/>
				</form>
			{/if}
		</div>
		<!-- Bottom -->
		<div
			bind:this={timerContainer}
			class="grid grid-cols-[1fr,_4fr,_3fr] items-end justify-center gap-4 xl:grid-cols-3"
		>
			<div class="flex col-start-2 justify-center items-center pb-10">
				<img src={timerLogo} alt="Nomad Team" />
			</div>
			<!-- Tools -->
			<div class="col-start-3">
				<div
					class="flex z-20 flex-col justify-between pt-2 ml-auto max-w-xs rounded-xl xl:pt-4 xl:w-3/4 bg-secondary"
				>
					<!-- @ts-ignore -->
					<svelte:component this={selectedValue.component} {...selectedValue.props} />
					<div class="flex flex-wrap gap-2 justify-center items-center py-2 px-2 text-lg md:py-4">
						<span class="py-1 text-white xl:py-2">Function</span>
						<select
							bind:value={selectedValue}
							class="py-1 px-2 w-4/5 text-black rounded-xl xl:py-2 xl:w-auto bg-background"
						>
							{#each options as o}
								<option value={o}>{o.label}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
