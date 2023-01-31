<script lang="ts">
	import Icon from '@iconify/svelte'
	import logo from '$lib/assets/scramble-logo.png'
	import type { CubeType } from '$lib/utils/enum-adapter'
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

	let timerEl: HTMLDivElement

	$: textColor = state === 'ready' ? 'text-green-500' : 'text-white'

	onMount(() => {
		if (browser) {
			timerEl.addEventListener('touchstart', e => {
				if (state === 'stopped') {
					updateState('ready')
				}
			})

			timerEl.addEventListener('touchend', e => {
				if (state === 'ready') {
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
	<div bind:this={timerEl} class="flex-grow p-4 flex flex-col">
		<div>
			<button class="bg-white text-xl w-full rounded-lg mt-4">{cubeTypeMapper[cubeType]}</button>
			<div class="mt-8 text-2xl text-[#b8b8b8] text-center">
				<p>
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
		<div class="flex justify-center items-center h-[40vh]">
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

<style>
	.page {
		background: linear-gradient(180deg, #363c41 29.35%, #1f252b 128.76%);
	}
</style>
