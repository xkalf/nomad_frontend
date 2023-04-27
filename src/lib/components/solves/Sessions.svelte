<script lang="ts">
	import { cubeType } from '$lib/stores/cubeType'
	import { session } from '$lib/stores/session'
	import { deleteSession, sessions } from '$lib/stores/sessions'
	import { solves } from '$lib/stores/solves'
	import { getSessionByCube, getSessionById } from '$lib/utils/api'
	import { cubeTypeMapper, cubeTypes } from '$lib/utils/types'
	import Icon from '@iconify/svelte'
	import type { CubeType, Session } from '@prisma/client'
	import Modal from '../Modal.svelte'

	export let changeCubeType: (type: CubeType) => Promise<void>

	export let mobile = false

	let isCubeTypeOpen = false
	let isSessionOpen = false
	let isSessionCreate = false
	let sessionName: string
	let selected: Session | undefined = undefined
	let isOpen = false

	$: formattedSessions = $sessions.map(i => {
		if (i.id === $session?.id) {
			return { ...i, _count: { solves: $solves.length } }
		}
		return i
	})

	async function changeSession(id: number) {
		if (id === $session.id) {
			isSessionOpen = false
		} else {
			await getSessionById(id)
			isSessionOpen = false
		}
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
			if (id === $session.id) {
				await getSessionByCube($cubeType)
			}
			selected = undefined
			isOpen = false
		}
	}
</script>

<div class={`m-4 ${mobile ? 'mx-auto w-full' : ''} rounded-xl bg-secondary py-2 px-4 text-white`}>
	<div>
		{#if isSessionOpen}
			<ul class="my-2 ml-2 max-h-24 w-full overflow-y-auto">
				{#each formattedSessions as s}
					<li class="flex justify-between pr-4">
						<button
							on:click={async () => {
								await changeSession(s.id)
							}}>{s.name} ({s._count.solves})</button
						>
						{#if s.main === false}
							<button
								class="text-lg text-red-500"
								on:click={() => {
									selected = s
									isOpen = true
								}}>X</button
							>
						{/if}
					</li>
				{/each}
			</ul>
		{:else}
			<p class="my-2 ml-2">
				{$session?.name || ''} ({$solves.length})
			</p>
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
				color="#fff"
				width="25"
				height="25"
				inline={true}
			/>
		</button>
		<!-- CubeType -->
		<div
			class={`relative flex flex-grow items-center justify-center rounded-xl bg-primary py-1 text-xl ${
				mobile ? 'hidden' : 'block'
			}`}
		>
			<ul
				class={`absolute left-0 bottom-0 z-0 flex w-full flex-col rounded-xl bg-primary pt-3 pb-10 ${
					isCubeTypeOpen ? 'block' : 'hidden'
				}`}
			>
				{#each cubeTypes as type}
					<li class="w-full px-1 text-center hover:bg-secondary">
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
			class="z-10 flex flex-grow items-center justify-center rounded-xl bg-primary py-1 text-xl text-green-400"
		>
			<button class="w-full" on:click={showSessionCreate}>+ Session</button>
		</div>
	</div>
</div>

<Modal bind:isOpen={isSessionCreate} okFunction={createSession} mode="create">
	<label for="sessionName" class="text-xl text-primary">Session-ийн нэр</label>
	<input
		id="sessionName"
		type="text"
		class="mt-2 w-full rounded-lg bg-secondary p-2 pl-3 text-lg text-white"
		bind:value={sessionName}
	/>
</Modal>

<Modal
	bind:isOpen
	okFunction={async () => {
		if (!selected) return
		await removeSession(selected.id)
	}}
>
	<p class="text-lg text-primary">Уг session-ийг устгах уу?</p>
</Modal>
