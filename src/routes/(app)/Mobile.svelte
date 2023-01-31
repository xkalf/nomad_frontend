<script lang="ts">
	import Icon from '@iconify/svelte'
	import logo from '$lib/assets/scramble-logo.png'
	import { cubeTypes, type CubeType } from '$lib/utils/enum-adapter'
	import {
		cubeTypeMapper,
		displayTime,
		formatMegaminxScramble,
		getAvg,
		getBest,
		type StateType
	} from '$lib/utils/timer-utils'
	import { solves } from '$lib/stores/solves'
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'

	export let time: number
	export let cubeType: CubeType
	export let scramble: string | null
	export let state: StateType
	export let startTime: () => void
	export let stopTime: () => Promise<void>
	export let updateState: (input: StateType) => void
	export let changeCubeType: (type: CubeType) => Promise<void>

	let timerEl: HTMLDivElement
	let isCubeTypeOpen = false

	$: textColor = state === 'ready' ? 'text-green-500' : 'text-white'

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

	onMount(() => {
		if (browser) {
			timerEl.addEventListener('touchstart', e => {
				if (state === 'stopped') {
					setTimeout(() => {
						updateState('ready')
					}, 100)
				}
			})

			timerEl.addEventListener('touchend', e => {
				if (state === 'ready' && isCubeTypeOpen === false) {
					startTime()
					updateState('running')
				} else if (state === 'running') {
					stopTime()
					updateState('stopping')

					setTimeout(() => {
						updateState('stopped')
					}, 300)
				}
			})
		}
	})
</script>

<div class="page flex h-screen select-none flex-col">
	<div class="flex flex-grow flex-col p-4">
		<div>
			<button
				class="mt-4 w-full rounded-lg bg-white text-xl"
				on:click={() => {
					isCubeTypeOpen = true
				}}>{cubeTypeMapper[cubeType]}</button
			>
			<div
				class={`${scrambleSizeMapper[cubeType]} mt-8 flex items-center justify-center text-center text-[#b8b8b8]`}
			>
				<p class={`${cubeType === 'minx' && 'text-justify'}`}>
					{#if !scramble}
						Холилт хийж байна
					{:else if cubeType === 'minx'}
						{@html formatMegaminxScramble(scramble)}
					{:else}
						{scramble}
					{/if}
				</p>
			</div>
		</div>
		<div bind:this={timerEl} class="flex h-[40vh] items-center justify-center">
			<p class={`font-mono text-7xl ${textColor}`}>{displayTime(time)}</p>
		</div>
		<div class="flex flex-grow items-end justify-between">
			<div class="space-y-2 text-[#b8b8b8]">
				<p>Best time: {getBest($solves)}</p>
				<p>
					Average of 5:
					{#if $solves.length >= 5}
						{getAvg($solves.slice(-5))}
					{:else}
						{displayTime(0)}
					{/if}
				</p>
				<p>
					Average of 12:
					{#if $solves.length >= 12}
						{getAvg($solves.slice(-12))}
					{:else}
						{displayTime(0)}
					{/if}
				</p>
			</div>
			<div class="flex items-end justify-end">
				<img class="w-12" src={logo} alt="scramble logo" />
			</div>
		</div>
	</div>
	<div class="flex items-center justify-around bg-[#040404] p-4">
		<Icon icon="game-icons:house" width="30" color="#A3A7AB" />
		<Icon icon="ri:pie-chart-2-fill" width="30" color="#A3A7AB" />
		<Icon icon="material-symbols:person" width="30" color="#A3A7AB" />
		<Icon icon="uiw:setting" width="30" color="#A3A7AB" />
	</div>
</div>

<div
	class={`${
		isCubeTypeOpen ? 'block' : 'hidden'
	} modal absolute top-1/2 left-1/2 w-64 text-center text-2xl text-white`}
>
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

<style>
	.page {
		background: linear-gradient(180deg, #363c41 29.35%, #1f252b 128.76%);
	}

	.modal {
		transform: translate(-50%, -50%);
	}
</style>
