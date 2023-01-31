<script lang="ts">
	import { page } from '$app/stores'
	import Icon from '@iconify/svelte'
	import type { Session } from '@prisma/client'
	import Average from './Average.svelte'
	import Solve from './Solve.svelte'
	import { solves } from '../../lib/stores/solves'
	import { cubeTypes, type CubeType } from '../../lib/utils/enum-adapter'
	import { cubeTypeMapper, displayTime, getAvg, getBest } from '../../lib/utils/timer-utils'
	import Modal from '$lib/Modal.svelte'

	export let session: Session
	export let cubeType: CubeType
	export let sessions: Session[] = []
	export let changeCubeType: (type: CubeType) => Promise<void>
	export let removeSession: (id: number) => void
	export let getSessionById: (id: number) => Promise<void>

	let isCubeTypeOpen = false
	let isSessionOpen = false
	let isSessionCreate = false
	let isSessionDelete = sessions.map(i => ({ id: i.id, isOpen: false }))
	let sessionName: string
	let sortMode: 'asc' | 'desc' | 'none' = 'none'

	$: isSessionDelete = sessions.map(i => ({ id: i.id, isOpen: false }))

	$: formattedSolves =
		sortMode === 'asc'
			? $solves.slice().sort((a, b) => a.time - b.time)
			: sortMode === 'desc'
			? $solves.slice().sort((a, b) => b.time - a.time)
			: $solves.slice().reverse()

	function toggleCubeTypes() {
		isCubeTypeOpen = !isCubeTypeOpen
	}

	function showSessionCreate(e: MouseEvent & { currentTarget: HTMLButtonElement & EventTarget }) {
		e.currentTarget.blur()
		const date = new Date()
		sessionName = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`

		isSessionCreate = true
	}

	async function changeCurrentCubeType(type: CubeType) {
		isCubeTypeOpen = false
		await changeCubeType(type)
	}

	async function deleteSession(id: number) {
		if (!isSessionDelete) {
			return
		}

		const response = await fetch(`api/session/${id}`, {
			method: 'DELETE'
		})
		const data = (await response.json()) as {
			success: boolean
		}

		if (data.success === true) {
			removeSession(id)
			if (session.id === id) {
				getSessionById(sessions.filter(i => i.id !== id)[0].id)
			}
			updateIsSessionDelete(id, false)
		}
	}

	async function createSession() {
		const response = await fetch('api/session', {
			method: 'POST',
			body: JSON.stringify({
				name: sessionName,
				cube: cubeType
			})
		})

		const data = (await response.json()) as {
			session: Session
		}

		if (data) {
			getSessionById(data.session.id)
			isSessionCreate = false
		}
	}

	async function changeSession(id: number) {
		if (id === session.id) {
			isSessionOpen = false
		} else {
			await getSessionById(id)
			isSessionOpen = false
		}
	}

	function changeSortMode() {
		switch (sortMode) {
			case 'none':
				sortMode = 'asc'
				break
			case 'asc':
				sortMode = 'desc'
				break
			case 'desc':
				sortMode = 'none'
				break
		}
	}

	function updateIsSessionDelete(id: number, open: boolean) {
		const index = isSessionDelete.findIndex(i => i.id === id)
		isSessionDelete[index].isOpen = open
	}
</script>

<div class="flex max-h-screen flex-col overflow-hidden bg-sidebarBg p-6">
	<div class="flex justify-between py-4 text-white">
		<p class="lowercase">{$page.data.user.email}</p>
		<form action="/logout" method="POST">
			<button type="submit">Гарах</button>
		</form>
	</div>
	<div class="flex justify-between">
		<div class={`flex h-14 w-14 items-center justify-center rounded-lg bg-[#5f6469]`}>
			<Icon icon="iconoir:rubik-cube" width="35" color="#A3A7AB" />
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5f6469]">
			<Icon icon="ri:pie-chart-2-fill" width="35" color="#A3A7AB" />
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5f6469]">
			<Icon icon="material-symbols:person" width="35" color="#A3A7AB" />
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5f6469]">
			<Icon icon="uiw:setting" width="35" color="#A3A7AB" />
		</div>
	</div>
	<div class="mt-4 flex flex-col justify-center gap-4 border-t border-[#797878] p-4">
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
		<div class="average flex gap-2">
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
	<div class="mx-4 flex flex-grow flex-col overflow-y-auto rounded-xl bg-sidebarElement">
		<!-- Sort -->
		<div
			class="flex w-full items-center justify-around rounded-t-xl bg-[#3E4449] py-2 text-lg text-white"
		>
			<button on:click={changeSortMode}>
				{#if sortMode === 'none'}
					1-9
				{:else if sortMode === 'asc'}
					9-1
				{:else if sortMode === 'desc'}
					Эцсийн
				{/if}
			</button>
			<Icon icon="ri:arrow-up-down-fill" width="22" />
			<button class="text-[#565D63]">B-W</button>
		</div>
		<!-- Solves -->
		<ul class="scrollbar flex-grow overflow-y-auto p-4">
			{#each formattedSolves as solve, index}
				<li>
					<Solve order={sortMode === 'none' ? formattedSolves.length - index : index + 1} {solve} />
				</li>
			{/each}
		</ul>
	</div>
	<div class="m-4 rounded-xl bg-sidebarElement py-2 px-4 text-white">
		<div>
			{#if isSessionOpen}
				<ul class="scrollbar my-2 ml-2 max-h-24 w-full overflow-y-auto">
					{#each sessions as s}
						<li class="flex justify-between pr-4">
							<button
								on:click={async () => {
									await changeSession(s.id)
								}}>{s.name}</button
							>
							{#if s.main === false}
								<button
									class="text-lg text-red-500"
									on:click={() => {
										updateIsSessionDelete(s.id, true)
									}}>X</button
								>
								<Modal
									isOpen={isSessionDelete.find(i => i.id === s.id)?.isOpen}
									okFunction={async () => {
										await deleteSession(s.id)
									}}
									cancelFunction={() => {
										updateIsSessionDelete(s.id, false)
									}}
								>
									<p class="text-lg text-white">Уг session-ийг устгах уу?</p>
								</Modal>
							{/if}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="my-2 ml-2">{session?.name || ''}</p>
			{/if}
		</div>
		<div class="flex items-center gap-1">
			<button
				on:click={() => {
					isSessionOpen = !isSessionOpen
				}}
			>
				<Icon
					icon={!isSessionOpen
						? 'material-symbols:keyboard-arrow-up-rounded'
						: 'material-symbols:keyboard-arrow-down-rounded'}
					color="#b8b8b8"
					width="25"
					height="25"
					inline={true}
				/>
			</button>
			<!-- CubeType -->
			<div
				class="relative flex flex-grow items-center justify-center rounded-xl bg-[#424B53] py-1 text-xl"
			>
				<ul
					class={`absolute left-0 bottom-0 z-0 flex w-full flex-col rounded-xl bg-[#424B53] pt-3 pb-10 ${
						isCubeTypeOpen ? 'block' : 'hidden'
					}`}
				>
					{#each cubeTypes.filter(i => i !== cubeType) as type}
						<li class="w-full px-1 text-center hover:bg-[#606C76]">
							<button class="w-full" on:click={async () => await changeCurrentCubeType(type)}
								>{cubeTypeMapper[type]}</button
							>
						</li>
					{/each}
				</ul>
				<button class="z-10 px-1" on:click={toggleCubeTypes}>{cubeTypeMapper[cubeType]}</button>
			</div>
			<!-- Session -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="z-10 flex flex-grow items-center justify-center rounded-xl bg-[#424b53] py-1 text-xl text-green-400"
			>
				<button on:click={showSessionCreate}>+ Session</button>
			</div>
		</div>
	</div>
</div>

<Modal
	isOpen={isSessionCreate}
	okFunction={createSession}
	cancelFunction={() => (isSessionCreate = false)}
	mode="create"
>
	<label for="sessionName" class="text-xl text-white">Session-ийн нэр</label>
	<input
		id="sessionName"
		type="text"
		class="mt-2 w-full rounded-lg bg-[#2B2F32] p-2 text-lg text-[#b8b8b8]"
		bind:value={sessionName}
	/>
</Modal>

<style>
	@media screen and (max-height: 800px) {
		.average {
			display: none;
		}
	}
</style>
