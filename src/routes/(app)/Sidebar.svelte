<script lang="ts">
	import { page } from '$app/stores'
	import Icon from '@iconify/svelte'
	import type { Session } from '@prisma/client'
	import Average from './Average.svelte'
	import Solve from './Solve.svelte'
	import { solves } from '../../lib/stores/solves'
	import { cubeTypes, type CubeType } from '../../lib/utils/enum-adapter'
	import { cubeTypeMapper, displayTime, getAvg, getBest } from '../../lib/utils/timer-utils'

	export let session: Session
	export let cubeType: CubeType
	export let sessions: Session[] = []
	export let changeCubeType: (type: CubeType) => Promise<void>
	export let removeSession: (id: number) => void
	export let getSessionById: (id: number) => Promise<void>

	let isCubeTypeOpen = false
	let isSessionOpen = false

	function toggleCubeTypes() {
		isCubeTypeOpen = !isCubeTypeOpen
	}

	async function changeCurrentCubeType(type: CubeType) {
		isCubeTypeOpen = false
		await changeCubeType(type)
	}

	async function deleteSession(id: number) {
		const response = await fetch(`api/session/${id}`, {
			method: 'DELETE'
		})
		const data = (await response.json()) as {
			success: boolean
		}

		if (data.success === true) removeSession(id)
	}
</script>

<div class="bg-sidebarBg p-6 max-h-screen overflow-hidden flex flex-col">
	<div class="py-4 text-white flex justify-between">
		<p class="lowercase">{$page.data.user.email}</p>
		<form action="/logout" method="POST">
			<button type="submit">Гарах</button>
		</form>
	</div>
	<div class="flex justify-between">
		<div class={`w-14 h-14 rounded-lg bg-[#5f6469] flex justify-center items-center`}>
			<Icon icon="iconoir:rubik-cube" width="35" color="#A3A7AB" />
		</div>
		<div class="w-14 h-14 rounded-lg bg-[#5f6469] flex justify-center items-center">
			<Icon icon="ri:pie-chart-2-fill" width="35" color="#A3A7AB" />
		</div>
		<div class="w-14 h-14 rounded-lg bg-[#5f6469] flex justify-center items-center">
			<Icon icon="material-symbols:person" width="35" color="#A3A7AB" />
		</div>
		<div class="w-14 h-14 rounded-lg bg-[#5f6469] flex justify-center items-center">
			<Icon icon="uiw:setting" width="35" color="#A3A7AB" />
		</div>
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
	<div class="bg-sidebarElement flex-grow rounded-xl mx-4 p-4 overflow-y-auto scrollbar">
		{#each $solves.slice().reverse() as solve, index}
			<Solve order={$solves.length - index} {solve} />
		{/each}
	</div>
	<div class="bg-sidebarElement m-4 rounded-xl py-2 px-4 text-white">
		<div>
			{#if isSessionOpen}
				<ul class="w-full my-2 ml-2 max-h-12 overflow-y-auto">
					{#each sessions as s}
						<li class="flex justify-between pr-4">
							<button
								on:click={async () => {
									getSessionById(s.id)
								}}>{s.name}</button
							>
							{#if s.main === false}
								<button
									class="text-red-500 text-lg"
									on:click={async () => {
										deleteSession(s.id)
									}}>X</button
								>
							{/if}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="ml-2 my-2">{session?.name || ''}</p>
			{/if}
		</div>
		<div class="flex items-center gap-1">
			<Icon
				icon="material-symbols:keyboard-arrow-up-rounded"
				color="#b8b8b8"
				width="25"
				height="25"
				inline={true}
			/>
			<!-- CubeType -->
			<div
				class="bg-[#424B53] py-1 flex justify-center items-center text-xl rounded-xl flex-grow relative"
			>
				<ul
					class={`flex flex-col absolute left-0 bottom-0 bg-[#424B53] pt-3 rounded-xl pb-10 z-0 w-full ${
						isCubeTypeOpen ? 'block' : 'hidden'
					}`}
				>
					{#each cubeTypes.filter(i => i !== cubeType) as type}
						<li class="hover:bg-[#606C76] w-full px-1 text-center">
							<button class="w-full" on:click={async () => await changeCurrentCubeType(type)}
								>{cubeTypeMapper[type]}</button
							>
						</li>
					{/each}
				</ul>
				<button class="px-1 z-10" on:click={toggleCubeTypes}>{cubeTypeMapper[cubeType]}</button>
			</div>
			<!-- Session -->
			<div
				class="flex-grow flex justify-center items-center text-green-400 bg-[#424b53] py-1 rounded-xl text-xl z-10"
			>
				<button>+ Session</button>
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
		margin-block: 0.5em;
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
