<script lang="ts">
	import { browser } from '$app/environment'
	import { cubeType, setCubeType } from '$lib/stores/cubeType'
	import { session } from '$lib/stores/session'
	import {
		addSolves,
		changeSolveStats,
		deleteSolvesMany,
		resetSolves,
		solves
	} from '$lib/stores/solves'
	import { getSessionByCube, getSessionById } from '$lib/utils/api'
	import { shortcutMapper, type StateType } from '$lib/utils/types'
	import { generateScramble } from '$lib/utils/timer-utils'
	import type { CubeType, SolveStatus, Solve } from '@prisma/client'
	import { onMount } from 'svelte'
	import Desktop from './Desktop.svelte'
	import Mobile from './Mobile.svelte'
	import Modal from '$lib/components/Modal.svelte'
	import { sortMode } from '$lib/stores/sortModa'
	import { setLoading } from '$lib/stores/loading'

	let scramble: string | null
	let currentScramble: string | null = null
	let lastScramble: string | null = null
	let time = 0
	let state: StateType = 'stopped'
	let interval: NodeJS.Timer
	let deleteAllModalOpen = false
	let deleteLastModalOpen = false
	let deleteCount = 1

	function startTime() {
		if (!$session) {
			return
		}

		const startedTime = Date.now()
		interval = setInterval(() => {
			const current = Date.now()
			time = current - startedTime
		}, 10)
	}

	async function stopTime() {
		clearInterval(interval)
		await Promise.all([newScramble(), createSolve(time)])
	}

	async function createSolve(time: number) {
		const response = await fetch('/api/solve', {
			method: 'POST',
			body: JSON.stringify({
				time,
				scramble,
				sessionId: $session.id
			})
		})

		const result: Solve = await response.json()

		addSolves(result)
	}

	async function removeSolves() {
		const response = await fetch(`api/session/${$session.id}/reset`, {
			method: 'DELETE'
		})
		const data = await response.json()

		if (data.success === true) {
			resetSolves()
			deleteAllModalOpen = false
		}
	}

	async function deleteLastSolve(count: number = 1) {
		let sortedSolves: Solve[] = []

		switch ($sortMode) {
			case 'none':
				sortedSolves = $solves.slice(-1 * count)
				break
			case 'asc':
				sortedSolves = $solves
					.slice()
					.sort((a, b) => a.time - b.time)
					.slice(0, count)
				break
			case 'desc':
				sortedSolves = $solves
					.slice()
					.sort((a, b) => b.time - a.time)
					.slice(0, count)
				break
		}

		const ids = sortedSolves.map(i => i.id)

		const response = await (
			await fetch(`/api/solve`, { method: 'DELETE', body: JSON.stringify({ ids }) })
		).json()

		if (response.success === true) {
			deleteSolvesMany(ids)
			deleteLastModalOpen = false
		}
	}

	async function changeCubeType(type: CubeType) {
		scramble = null
		setCubeType(type)

		if (browser) {
			const id = localStorage.getItem(type)
			if (id) {
				await getSessionById(parseInt(id))
			} else {
				await getSessionByCube(type)
			}
		}
	}

	async function newScramble() {
		lastScramble = scramble
		if (currentScramble) {
			scramble = currentScramble
		} else {
			scramble = await generateScramble($cubeType)
		}
		currentScramble = null
	}

	async function getLastScramble() {
		if (!lastScramble) return

		currentScramble = scramble
		scramble = lastScramble
	}

	async function updateLastSolve(status: SolveStatus) {
		const last = $solves[$solves.length - 1]
		if (last.status === status) {
			return
		}

		const response = await fetch(`/api/solve/${last.id}`, {
			method: 'PUT',
			body: JSON.stringify({ status })
		})
		const data = await response.json()

		if (data.success === true) changeSolveStats(last.id, status)
	}

	session.subscribe(async value => {
		if (value?.cube && browser) {
			scramble = await generateScramble(value.cube as CubeType)
		}
	})

	onMount(async () => {
		if (browser) {
			setLoading(true)
			await newScramble()
			setLoading(false)
			window.addEventListener('keyup', e => {
				if (e.key === ' ') {
					if (state === 'ready') {
						startTime()
						state = 'running'
					}
				}
			})

			window.addEventListener('keydown', async e => {
				if (e.key === ' ') {
					if (state === 'stopped' && scramble) {
						state = 'ready'
					}
				} else if (e.altKey) {
					switch (e.code) {
						case 'ArrowLeft':
							e.preventDefault()
							await getLastScramble()
							return
						case 'ArrowRight':
							e.preventDefault()
							await newScramble()
							return
						case 'KeyD':
							e.preventDefault()
							deleteAllModalOpen = true
							return
						case 'KeyZ':
							e.preventDefault()
							deleteLastModalOpen = true
							deleteCount = 1
							return
					}

					if (Object.keys(shortcutMapper).includes(e.code)) {
						e.preventDefault()
						await changeCubeType(shortcutMapper[e.code])
					}
				} else if (e.ctrlKey) {
					switch (e.code) {
						case 'Digit1':
							e.preventDefault()
							await updateLastSolve('Ok')
							return
						case 'Digit2':
							e.preventDefault()
							await updateLastSolve('Plus2')
							return
						case 'Digit3':
							e.preventDefault()
							await updateLastSolve('Dnf')
							return
					}
				}

				if (state === 'running') {
					e.preventDefault()

					stopTime()
					state = 'stopping'

					setTimeout(() => {
						state = 'stopped'
					}, 300)
				}
			})
		}
	})

	function updateState(input: StateType) {
		state = input
	}

	function openDeleteLastModal() {
		deleteLastModalOpen = true
	}

	function openDeleteAllModal() {
		deleteAllModalOpen = true
	}

	const desktopFunctions = {
		changeCubeType
	}

	const mobileFunctions = {
		startTime,
		stopTime,
		updateState,
		changeCubeType,
		newScramble,
		getLastScramble,
		openDeleteLastModal,
		openDeleteAllModal,
		updateLastSolve,
		createSolve
	}
</script>

<svelte:head>
	<title>Хугацаа хэмжигч</title>
</svelte:head>

<div class="md:hidden">
	<Mobile {...mobileFunctions} {time} {scramble} {state} />
</div>
<div class="hidden md:block">
	<Desktop {...desktopFunctions} {time} {scramble} {state} />
</div>

<Modal
	okFunction={() => deleteLastSolve(deleteCount)}
	cancelFunction={() => {
		deleteLastModalOpen = false
	}}
	isOpen={deleteLastModalOpen}
>
	<p class="text-lg text-white">Сүүлийн хэдэн эвлүүлэлтийг устгах уу?</p>
	<input
		bind:value={deleteCount}
		class="mt-2 w-full rounded-lg bg-[#2B2F32] p-2 pl-3 text-lg text-[#b8b8b8]"
		type="text"
	/>
</Modal>

<Modal
	okFunction={removeSolves}
	isOpen={deleteAllModalOpen}
	cancelFunction={() => {
		deleteAllModalOpen = false
	}}
>
	<p class="text-lg text-white">Энэ session-ийн эвлүүлэлтүүдийг устгах уу?</p>
</Modal>
