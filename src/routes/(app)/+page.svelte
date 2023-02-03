<script lang="ts">
	import { browser } from '$app/environment'
	import { cubeType, setCubeType } from '$lib/stores/cubeType'
	import { session } from '$lib/stores/session'
	import { addSolves, deleteSolves, resetSolves, solves } from '$lib/stores/solves'
	import { getSessionByCube } from '$lib/utils/api'
	import type { CubeType } from '$lib/utils/enum-adapter'
	import { generateScramble, shortcutMapper, type StateType } from '$lib/utils/timer-utils'
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

	function startTime() {
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

	async function deleteLastSolve() {
		const lastId = $solves[$solves.length - 1].id

		const response = await (await fetch(`/api/solve/${lastId}`, { method: 'DELETE' })).json()
		if (response.success === true) {
			deleteSolves(lastId)
			deleteLastModalOpen = false
		}
	}

	async function changeCubeType(type: CubeType) {
		scramble = null
		setCubeType(type)
		await Promise.all([newScramble(), getSessionByCube(type)])
	}

	async function newScramble() {
		lastScramble = scramble
		scramble = await generateScramble($cubeType)
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
					if (state === 'stopped') {
						state = 'ready'
					}
				} else if (e.altKey) {
					switch (e.code) {
						case 'ArrowLeft':
							scramble = lastScramble
							return
						case 'ArrowRight':
							await newScramble()
							return
						case 'KeyD':
							deleteAllModalOpen = true
							e.preventDefault()
							return
						case 'KeyZ':
							deleteLastModalOpen = true
							return
					}

					if (Object.keys(shortcutMapper).includes(e.code)) {
						await changeCubeType(shortcutMapper[e.code])
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
		changeCubeType
	}
</script>

<div class="md:hidden">
	<Mobile {...mobileFunctions} {time} {scramble} {state} />
</div>
<div class="hidden md:block">
	<Desktop
		{...desktopFunctions}
		{scramble}
		{time}
		{state}
		{deleteAllModalOpen}
		{deleteLastModalOpen}
	/>
</div>
