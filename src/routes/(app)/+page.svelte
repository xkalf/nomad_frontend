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
	import { getSessionByCube } from '$lib/utils/api'
	import { shortcutMapper, type CubeType, type SolveStatus, type StateType } from '$lib/utils/types'
	import { generateScramble } from '$lib/utils/timer-utils'
	import type { Solve } from '@prisma/client'
	import { onMount } from 'svelte'
	import Desktop from './Desktop.svelte'
	import Mobile from './Mobile.svelte'

	let scramble: string | null
	let time = 0
	let state: StateType = 'stopped'
	let interval: NodeJS.Timer
	let lastScramble: string | null = null
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
		const ids = $solves.slice(-1 * count).map(i => i.id)

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
		await getSessionByCube(type)
	}

	async function newScramble() {
		lastScramble = scramble
		scramble = await generateScramble($cubeType)
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
		if (value?.cube) {
			scramble = await generateScramble(value.cube as CubeType)
		}
	})

	onMount(async () => {
		if (browser) {
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
							if (lastScramble) scramble = lastScramble
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
							await updateLastSolve('ok')
							return
						case 'Digit2':
							e.preventDefault()
							await updateLastSolve('+2')
							return
						case 'Digit3':
							e.preventDefault()
							await updateLastSolve('dnf')
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

	const desktopFunctions = {
		changeCubeType,
		deleteLastSolve,
		removeSolves
	}

	const mobileFunctions = {
		startTime,
		stopTime,
		updateState,
		changeCubeType,
		deleteLastSolve,
		removeSolves
	}
</script>

<svelte:head>
	<title>Хугацаа хэмжигч</title>
</svelte:head>

<div class="md:hidden">
	<Mobile
		{...mobileFunctions}
		{time}
		{scramble}
		{state}
		{deleteLastModalOpen}
		{deleteAllModalOpen}
		{deleteCount}
	/>
</div>
<div class="hidden md:block">
	<Desktop
		{...desktopFunctions}
		{scramble}
		{time}
		{state}
		{deleteAllModalOpen}
		{deleteLastModalOpen}
		{deleteCount}
	/>
</div>
