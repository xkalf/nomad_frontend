<script lang="ts">
	import timerLogo from '$lib/assets/timer-logo.png'
	import Sidebar from './Sidebar.svelte'
	import { resetSolves, deleteSolves, solves, addSolves, initialSolves } from '$lib/stores/solves'
	import {
		displayTime,
		formatMegaminxScramble,
		generateScramble,
		shortcutMapper
	} from '$lib/utils/timer-utils'
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'
	import type { Session, Solve } from '@prisma/client'
	import type { CubeType } from '$lib/utils/enum-adapter'

	let scramble: string | null
	let session: Session
	let time = 0
	let state: 'stopped' | 'running' | 'ready' | 'stopping' = 'stopped'
	let interval: NodeJS.Timer
	let solvesDiv: HTMLDivElement
	let lastScramble: string | null = null
	let cubeType: CubeType = '333'
	let sessions: Session[]

	$: textColor = state === 'ready' ? 'text-green-500' : 'text-white'

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
		if (!confirm('Уг эвлүүлэлтүүдийг устгахдаа итгэлтэй байна уу?')) {
			return
		}

		const response = await fetch(`api/session/${session.id}/reset`, {
			method: 'DELETE'
		})
		const data = await response.json()

		if (data.success === true) resetSolves()
	}

	async function deleteLastSolve() {
		if (!confirm('Уг эвлүүлэлтийг устгахдаа итгэлтэй байна уу?')) {
			return
		}

		const lastId = $solves[$solves.length - 1].id

		const response = await (await fetch(`/api/solve/${lastId}`, { method: 'DELETE' })).json()
		if (response.success === true) deleteSolves(lastId)
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
		const result = (await (await fetch(`/api/session?cube=${type}`)).json()) as {
			sessions: Session[]
		}

		sessions = result.sessions

		const id = result.sessions.find(i => i.main === true)?.id

		const currentSession = (await (await fetch(`/api/session/${id}`)).json()) as {
			session: Session & { solves: Solve[] }
		}

		session = currentSession.session
		initialSolves(currentSession.session.solves)

		localStorage.setItem('sessionId', id?.toString() || '')
	}

	async function getSessionById(id: number) {
		const currentSession = (await (await fetch(`/api/session/${id}`)).json()) as {
			session: Session & { solves: Solve[] }
		}

		const result = (await (
			await fetch(`/api/session?cube=${currentSession.session.cube}`)
		).json()) as {
			sessions: Session[]
		}

		sessions = result.sessions

		cubeType = session.cube as CubeType
		session = currentSession.session
		initialSolves(currentSession.session.solves)
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
			changeCubeType((localStorage.getItem('cube') as CubeType) || '333')

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
							await removeSolves()
							return
						case 'KeyZ':
							await deleteLastSolve()
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
</script>

<div class="h-screen grid grid-cols-[minmax(350px,_1fr)_4fr]">
	<Sidebar
		{getSessionById}
		{removeSession}
		{session}
		{cubeType}
		{changeCubeType}
		{sessions}
		bind:solvesDiv
	/>
	<div class="bg-[#363C41] p-4 flex flex-col overflow-hidden justify-between">
		<!-- Scramble -->
		<div class="mt-[3vh] flex justify-center items-center h-1/6 p-20 text-center">
			<p
				class={`text-5xl text-scramble ${
					cubeType === 'minx' && 'text-justify text-3xl lg:text-4xl font-mono mt-10'
				} ${cubeType === '777' || cubeType === '666' ? 'text-2xl lg:text-3xl' : ''}`}
			>
				{#if !scramble}
					Холилт хийж байна
				{:else if cubeType === 'minx'}
					{@html formatMegaminxScramble(scramble)}
				{:else}
					{scramble}
				{/if}
			</p>
		</div>
		<!-- Time -->
		<div class="flex justify-center items-center">
			<p class={`${textColor} text-[200px] leading-6 font-mono`}>{displayTime(time)}</p>
		</div>
		<div class="grid grid-cols-[3fr,_minmax(70px,_1fr)]">
			<div class="flex justify-center items-end mb-10 col-span-3">
				<img src={timerLogo} alt="Nomad Team" />
			</div>
			<!-- Tools -->
			<div class="bg-sidebarBg col-start-4 rounded-xl">
				<scramble-display
					{scramble}
					event={cubeType}
					visualization={cubeType === 'pyram' ? '2D' : '3D'}
				/>
				<div class="flex justify-around items-center p-3">
					<span class="text-white text-xl py-2">Function</span>
					<select class="bg-sidebarElement text-white py-2 px-4 text-xl rounded-xl">
						<option>Draw Scramble</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	scramble-display {
		width: 100%;
	}

	@media screen and (max-width: 1024px) {
		scramble-display {
			width: 60%;
		}
	}
</style>
