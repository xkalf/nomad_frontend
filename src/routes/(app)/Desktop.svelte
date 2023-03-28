<script lang="ts">
	import timerLogo from '$lib/assets/timer-logo.webp'
	import Sidebar from './Sidebar.svelte'
	import { formatMegaminxScramble } from '$lib/utils/timer-utils'
	import { cubeType } from '$lib/stores/cubeType'
	import ScrambleDisplay from '$lib/components/ScrambleDisplay.svelte'
	import type { CubeType } from '@prisma/client'
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'
	import { settings } from '$lib/stores/settings'

	export let timerText: string
	export let scramble: string
	export let changeCubeType: (type: CubeType) => Promise<void>
	export let eventUp: () => void
	export let eventDown: (s: boolean) => void
	export let textColor: string

	let timerEl: HTMLDivElement

	const scrambleSizeMapper: Record<CubeType, string> = {
		N2: 'text-5xl',
		N3: 'text-5xl',
		N4: 'text-5xl',
		N5: 'text-5xl',
		N6: 'text-2xl lg:text-3xl',
		N7: 'text-2xl lg:text-3xl',
		Bld3: 'text-5xl',
		Bld4: 'text-5xl',
		Bld5: 'text-5xl',
		Sq1: 'text-5xl',
		Pyraminx: 'text-5xl',
		Megaminx: 'text-2xl md:text-3xl text-justify font-mono',
		Clock: 'text-5xl',
		Skewb: 'text-5xl'
	}

	onMount(() => {
		if (browser && $settings.useMouseTimer) {
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
	<div
		bind:this={timerEl}
		class="relative flex flex-col justify-between overflow-hidden bg-background p-4"
	>
		<!-- Scramble -->
		<div class="h-1/6 mt-[3vh] flex items-center justify-center p-20 pt-5 text-center text-primary">
			<p class={`${scrambleSizeMapper[$cubeType]}`}>
				{#if $cubeType === 'Megaminx'}
					{@html formatMegaminxScramble(scramble)}
				{:else}
					{scramble}
				{/if}
			</p>
		</div>
		<!-- Time -->
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<p class={`${textColor} font-mono text-[200px] leading-6`}>{timerText}</p>
		</div>
		<div class="grid grid-cols-[3fr,_minmax(70px,_1fr)]">
			<div class="col-span-3 mb-10 flex items-end justify-center">
				<img src={timerLogo} alt="Nomad Team" />
			</div>
			<!-- Tools -->
			<div class="z-20 col-start-4 rounded-xl bg-secondary">
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
