<script lang="ts">
	import Icon from '@iconify/svelte'
	import type { Session } from '@prisma/client'
	import Average from './Average.svelte'
	import Solve from './Solve.svelte'
	import { solves } from './stores/solves'
	import type { CubeType } from './utils/enum-adapter'
	import { displayTime, getAvg, getBest } from './utils/timer-utils'

	export let user: {
		id: number
		email: string
		role: string
	}
	export let session: Session
	export let cubeType: CubeType

	export let solvesDiv: HTMLDivElement

	function cubeTypeMapper(type: CubeType) {
		switch (type) {
			case '222':
				return '2x2'
			case '333':
				return '3x3'
			case '444':
				return '4x4'
			case '555':
				return '5x5'
			case '666':
				return '6x6'
			case '777':
				return '7x7'
			case 'sq1':
				return 'Sq 1'
			case 'pyram':
				return 'Pyra'
			case 'minx':
				return 'Mega'
			case 'clock':
				return 'Clock'
			case '333bf':
				return '3Bld'
			default:
				return ''
		}
	}
</script>

<div class="bg-sidebarBg p-6 max-h-screen overflow-hidden flex flex-col">
	<div class="py-4 text-white">
		<p class="lowercase">{user.email}</p>
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
		class="bg-sidebarElement flex-grow rounded-xl mx-4 p-4 overflow-y-auto scrollbar"
		bind:this={solvesDiv}
	>
		{#each $solves as solve, index}
			<Solve order={index + 1} {solve} />
		{/each}
	</div>
	<div class="bg-sidebarElement m-4 rounded-xl py-2 px-4 text-white">
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

	.scrollbar::-webkit-scrollbar {
		width: 10px;
	}

	.scrollbar::-webkit-scrollbar-thumb {
		background-color: #c4c4c4;
		border-radius: 10px;
	}

	.scrollbar::-webkit-scrollbar-track {
		background-color: none;
	}

	@media (max-width: 1024px) {
		.scrollbar::-webkit-scrollbar {
			width: 5px;
		}
		.scrollbar::-webkit-scrollbar-thumb {
			background-color: #c4c4c4;
			border-radius: 5px;
		}
	}
</style>
