<script lang="ts">
	import { page } from '$app/stores'
	import Icon from '@iconify/svelte'
	import { session_cube_enum, type Session } from '@prisma/client'
	import Average from './Average.svelte'
	import Solve from './Solve.svelte'
	import { solves } from './stores/solves'
	import { displayTime, getAvg, getBest } from './utils/timer-utils'

	export let session: Session
	export let cubeType: session_cube_enum

	export let solvesDiv: HTMLDivElement

	function cubeTypeMapper(type: session_cube_enum) {
		switch (type) {
			case session_cube_enum.n2x2:
				return '2x2'
			case session_cube_enum.n3x3:
				return '3x3'
			case session_cube_enum.n4x4:
				return '4x4'
			case session_cube_enum.n5x5:
				return '5x5'
			case session_cube_enum.n6x6:
				return '6x6'
			case session_cube_enum.n7x7:
				return '7x7'
			case session_cube_enum.sq1:
				return 'Sq 1'
			case session_cube_enum.pyraminx:
				return 'Pyra'
			case session_cube_enum.megaminx:
				return 'Mega'
			case session_cube_enum.clock:
				return 'Clock'
			case session_cube_enum.bld3:
				return '3Bld'
			default:
				return ''
		}
	}
</script>

<div class="bg-sidebarBg p-6 max-h-screen overflow-hidden flex flex-col">
	<div class="py-4 text-white">
		<p class="capitalize">{$page?.data?.user?.email}</p>
	</div>
	<div class="flex justify-between">
		<div class="w-14 h-14 rounded bg-[#5f6469]" />
		<div class="w-14 h-14 rounded bg-[#5f6469]" />
		<div class="w-14 h-14 rounded bg-[#5f6469]" />
		<div class="w-14 h-14 rounded bg-[#5f6469]" />
	</div>
	<div class="mt-4 border-t border-[#797878] p-4 flex flex-col justify-center gap-4">
		<Average label="Best" value={getBest($solves)} best={true} />
		<div class="flex gap-2">
			<Average
				label="Ao5"
				value={$solves.length >= 5 ? getAvg($solves.slice(-5)) : displayTime(0)}
			/>
			<Average
				label="Ao12"
				value={$solves.length >= 12 ? getAvg($solves.slice(-12)) : displayTime(0)}
			/>
		</div>
		<div class="flex gap-2 average">
			<Average
				label="Ao25"
				value={$solves.length >= 25 ? getAvg($solves.slice(-25)) : displayTime(0)}
			/>
			<Average
				label="Ao50"
				value={$solves.length >= 50 ? getAvg($solves.slice(-50)) : displayTime(0)}
			/>
		</div>
	</div>
	<div
		class="bg-sidebarElement flex-grow rounded-xl mx-4 p-4 overflow-y-auto scrollbar-thumb-[#c4c4c4] scrollbar-thin"
		bind:this={solvesDiv}
	>
		{#each $solves as solve, index}
			<Solve order={index + 1} {solve} />
		{/each}
	</div>
	<div class="bg-sidebarElement m-4 rounded-xl py-2 px-4 text-white">
		<!-- <scramble-display visualization="3D" event={cubeType} {scramble} /> -->
		<p class="ml-2 my-2">{session?.name || ''}</p>
		<div class="flex items-center gap-1">
			<Icon
				icon="material-symbols:keyboard-arrow-up-rounded"
				color="#b8b8b8"
				width="30"
				height="30"
				inline={true}
			/>
			<div class="bg-[#424B53] py-1 flex justify-center items-center text-xl rounded-xl flex-grow">
				<button>{cubeTypeMapper(cubeType)}</button>
			</div>
			<div
				class="flex-grow flex justify-center items-center text-green-400 bg-[#424b53] py-1 rounded-xl text-xl"
			>
				<button>+ New Session</button>
			</div>
		</div>
	</div>
</div>

<style>
	@media screen and (max-height: 800px) {
		.average {
			display: none;
		}
	}
</style>
