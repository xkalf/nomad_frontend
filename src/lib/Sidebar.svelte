<script lang="ts">
	import Icon from '@iconify/svelte'
	import Average from './Average.svelte'
	import Solve from './Solve.svelte'
	import { solves } from './stores/solves'
	import { user } from './stores/user'
	import { CubeType, type Session, type Solve as SolveType } from './types'
	import { displayTime, getAvg, getBest } from './utils/timer-utils'

	export let cubeType: CubeType
	export let session: Session

	export let solvesDiv: HTMLDivElement

	function cubeTypeMapper(type: CubeType) {
		switch (type) {
			case CubeType.n2x2:
				return '2x2'
			case CubeType.n3x3:
				return '3x3'
			case CubeType.n4x4:
				return '4x4'
			case CubeType.n5x5:
				return '5x5'
			case CubeType.n6x6:
				return '6x6'
			case CubeType.n7x7:
				return '7x7'
			case CubeType.Sq1:
				return 'Sq 1'
			case CubeType.Pyraminx:
				return 'Pyra'
			case CubeType.Megaminx:
				return 'Mega'
			case CubeType.Clock:
				return 'Clock'
			case CubeType.Bld:
				return '3Bld'
			default:
				return ''
		}
	}
</script>

<div
	class="lg:w-1/4 w-1/3 max-w-[500px] bg-sidebarBg p-6 max-h-screen overflow-hidden flex flex-col"
>
	<div class="py-4 text-white">
		<p class="capitalize">{$user.firstname}</p>
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
