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

<div class="page h-screen flex flex-col select-none">
	<div class="flex-grow p-4 flex flex-col">
		<div>
			<button
				class="bg-white text-xl w-full rounded-lg mt-4"
				on:click={() => {
					isCubeTypeOpen = true
				}}>{cubeTypeMapper[cubeType]}</button
			>
			<div
				class={`${scrambleSizeMapper[cubeType]} mt-8 text-[#b8b8b8] text-center flex justify-center items-center`}
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
		<div bind:this={timerEl} class="flex justify-center items-center h-[40vh]">
			<p class={`text-7xl font-mono ${textColor}`}>{displayTime(time)}</p>
		</div>
		<div class="flex justify-between items-end flex-grow">
			<div class="text-[#b8b8b8] space-y-2">
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
			<div class="flex justify-end items-end">
				<img class="w-12" src={logo} alt="scramble logo" />
			</div>
		</div>
	</div>
	<div class="bg-[#040404] flex items-center justify-around p-4">
		<Icon icon="game-icons:house" width="30" color="#A3A7AB" />
		<Icon icon="ri:pie-chart-2-fill" width="30" color="#A3A7AB" />
		<Icon icon="material-symbols:person" width="30" color="#A3A7AB" />
		<Icon icon="uiw:setting" width="30" color="#A3A7AB" />
	</div>
</div>

<div
	class={`${
		isCubeTypeOpen ? 'block' : 'hidden'
	} absolute top-1/2 left-1/2 modal text-2xl text-white text-center w-64`}
>
	<ul class="bg-[#040404] max-h-64 overflow-y-auto scrollbar rounded-xl">
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
		class="mt-2 bg-[#040404] rounded-xl w-full text-white py-3"
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
