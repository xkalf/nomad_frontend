<script lang="ts">
	import timerLogo from '$lib/assets/timer-logo.png'
	import Sidebar from '$lib/Sidebar.svelte'
	import { resetSolves, deleteSolves, solves, addSolves, initialSolves } from '$lib/stores/solves'
	import { displayTime, formatMegaminxScramble, generateScramble } from '$lib/utils/timer-utils'
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
	let cubeType: CubeType = '333'
	let lastScramble: string | null = null

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
				sessionId: session?.id
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
		const result = (await (await fetch(`/api/session?cube=${cubeType}`)).json()) as {
			session: Session & {
				solves: Solve[]
			}
		}

		session = result.session
		initialSolves(result.session.solves)
	}

	async function changeCubeType(type: CubeType) {
		scramble = null
		cubeType = type
		await Promise.all([newScramble(), getSession()])
		if (browser) [localStorage.setItem('cube', type)]
	}

	async function newScramble() {
		lastScramble = scramble
		scramble = await generateScramble(cubeType)
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
							break
						case 'ArrowRight':
							await newScramble()
							break
						case 'KeyD':
							await removeSolves()
							break
						case 'KeyZ':
							await deleteLastSolve()
							break
						case 'Digit1':
							changeCubeType('sq1')
							break
						case 'Digit2':
							changeCubeType('222')
							break
						case 'Digit3':
							changeCubeType('333')
							break
						case 'Digit4':
							changeCubeType('444')
							break
						case 'Digit5':
							changeCubeType('555')
							break
						case 'Digit6':
							changeCubeType('666')
							break
						case 'Digit7':
							changeCubeType('777')
							break
						case 'KeyM':
							changeCubeType('minx')
							break
						case 'KeyC':
							changeCubeType('clock')
							break
						case 'KeyP':
							changeCubeType('pyram')
							break
						case 'KeyB':
							changeCubeType('333bf')
							break
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

<div class="h-screen grid grid-cols-[minmax(300px,_1fr)_4fr]">
	<Sidebar {session} {cubeType} bind:solvesDiv />
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
