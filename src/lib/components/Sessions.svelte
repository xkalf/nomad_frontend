<script lang="ts">
	import { cubeType } from '$lib/stores/cubeType'
	import { session } from '$lib/stores/session'
	import { deleteSession, sessions } from '$lib/stores/sessions'
	import { getSessionById } from '$lib/utils/api'
	import { cubeTypeMapper, cubeTypes, type CubeType } from '$lib/utils/types'
	import Icon from '@iconify/svelte'
	import type { Session } from '@prisma/client'
	import Modal from './Modal.svelte'

	export let changeCubeType: (type: CubeType) => Promise<void>

	export let mobile = false

	let isCubeTypeOpen = false
	let isSessionOpen = false
	let isSessionCreate = false
	$: isSessionDelete = $sessions.map(i => ({ id: i.id, isOpen: false }))
	let sessionName: string

	async function changeSession(id: number) {
		if (id === $session.id) {
			isSessionOpen = false
		} else {
			await getSessionById(id)
			isSessionOpen = false
		}
	}

	function updateIsSessionDelete(id: number, open: boolean) {
		const index = isSessionDelete.findIndex(i => i.id === id)
		isSessionDelete[index].isOpen = open
	}

	function showSessionCreate(e: MouseEvent & { currentTarget: HTMLButtonElement & EventTarget }) {
		e.currentTarget.blur()
		const date = new Date()
		sessionName = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
			.getDate()
			.toString()
			.padStart(2, '0')}`

		isSessionCreate = true
	}

	async function changeCurrentCubeType(type: CubeType) {
		isCubeTypeOpen = false
		await changeCubeType(type)
	}

	function toggleCubeTypes() {
		isCubeTypeOpen = !isCubeTypeOpen
	}

	async function createSession() {
		const response = await fetch('api/session', {
			method: 'POST',
			body: JSON.stringify({
				name: sessionName,
				cube: $cubeType
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

	async function removeSession(id: number) {
		const response = await fetch(`api/session/${id}`, {
			method: 'DELETE'
		})

		const data = await response.json()

		if (data.success) {
			deleteSession(id)
		}
	}
</script>

<div
	class={`m-4 ${mobile ? 'mx-auto w-full' : ''} rounded-xl bg-sidebarElement py-2 px-4 text-white`}
>
	<div>
		{#if isSessionOpen}
			<ul class="scrollbar my-2 ml-2 max-h-24 w-full overflow-y-auto">
				{#each $sessions as s}
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
									await removeSession(s.id)
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
			<p class="my-2 ml-2">{$session?.name || ''}</p>
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
			class={`relative flex flex-grow items-center justify-center rounded-xl bg-[#424B53] py-1 text-xl ${
				mobile ? 'hidden' : 'block'
			}`}
		>
			<ul
				class={`absolute left-0 bottom-0 z-0 flex w-full flex-col rounded-xl bg-[#424B53] pt-3 pb-10 ${
					isCubeTypeOpen ? 'block' : 'hidden'
				}`}
			>
				{#each cubeTypes.filter(i => i !== $cubeType) as type}
					<li class="w-full px-1 text-center hover:bg-[#606C76]">
						<button class="w-full" on:click={async () => await changeCurrentCubeType(type)}
							>{cubeTypeMapper[type]}</button
						>
					</li>
				{/each}
			</ul>
			<button class="z-10 px-1" on:click={toggleCubeTypes}>{cubeTypeMapper[$cubeType]}</button>
		</div>
		<!-- Session -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="z-10 flex flex-grow items-center justify-center rounded-xl bg-[#424b53] py-1 text-xl text-green-400"
		>
			<button class="w-full" on:click={showSessionCreate}>+ Session</button>
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
		class="mt-2 w-full rounded-lg bg-[#2B2F32] p-2 pl-3 text-lg text-[#b8b8b8]"
		bind:value={sessionName}
	/>
</Modal>
