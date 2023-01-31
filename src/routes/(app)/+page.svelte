<script lang="ts">
	import { browser } from '$app/environment'
	import { addSolves, deleteSolves, initialSolves, resetSolves, solves } from '$lib/stores/solves'
	import type { CubeType } from '$lib/utils/enum-adapter'
	import { generateScramble, shortcutMapper, type StateType } from '$lib/utils/timer-utils'
	import type { Session, Solve } from '@prisma/client'
	import { onMount } from 'svelte'
	import Desktop from './Desktop.svelte'
	import Mobile from './Mobile.svelte'

	let scramble: string | null
	let session: Session
	let time = 0
	let state: StateType = 'stopped'
	let interval: NodeJS.Timer
	let lastScramble: string | null = null
	let cubeType: CubeType = '333'
	let sessions: Session[]
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
				sessionId: session.id
			})
		})

		const result: Solve = await response.json()

		addSolves(result)
	}

	async function removeSolves() {
		const response = await fetch(`api/session/${session.id}/reset`, {
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

	async function getSession() {
		if (browser) {
			const sessionId = localStorage.getItem('sessionId')

			if (!sessionId) {
				await getSessionByCube(cubeType)
				return
			}

			const id = parseFloat(sessionId)

			if (isNaN(id)) {
				await getSessionByCube(cubeType)
				return
			}

			await getSessionById(id)
			return
		}
	}

	async function getSessionByCube(type: CubeType) {
		const result = (await (await fetch(`/api/session?cube=${type}&main=true`)).json()) as {
			sessions: Session[]
		}

		sessions = result.sessions

		const id = result.sessions.find(i => i.main === true)?.id

		const currentSession = (await (await fetch(`/api/session/${id}`)).json()) as {
			session: Session & { solves: Solve[] }
		}

		session = currentSession.session
		initialSolves(currentSession.session.solves)

		if (browser) localStorage.setItem('sessionId', id?.toString() || '')
	}

	async function getSessionById(id: number) {
		const currentSession = (await (await fetch(`/api/session/${id}`)).json()) as {
			session: Session & { solves: Solve[] }
		}

		if (!currentSession.session) {
			await getSessionByCube(cubeType)
			return
		}

		const result = (await (
			await fetch(`/api/session?cube=${currentSession.session.cube}`)
		).json()) as {
			sessions: Session[]
		}

		if (browser) {
			localStorage.setItem('sessionId', currentSession.session.id.toString())
		}

		sessions = result.sessions
		session = currentSession.session
		initialSolves(currentSession.session.solves)

		scramble = null
		cubeType = currentSession.session.cube as CubeType
		await newScramble()
	}

	async function changeCubeType(type: CubeType) {
		scramble = null
		cubeType = type
		await Promise.all([newScramble(), getSessionByCube(type)])
	}

	async function newScramble() {
		lastScramble = scramble
		scramble = await generateScramble(cubeType)
	}

	function removeSession(id: number) {
		sessions = sessions.filter(i => i.id !== id)
	}

	onMount(async () => {
		if (browser) {
			await getSession()

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
		getSessionById,
		removeSession,
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
	<Mobile {...mobileFunctions} {time} {scramble} {cubeType} {state} />
</div>
<div class="hidden md:block">
	<Desktop
		{...desktopFunctions}
		{session}
		{scramble}
		{sessions}
		{time}
		{cubeType}
		{state}
		{deleteAllModalOpen}
		{deleteLastModalOpen}
	/>
</div>
