<script lang="ts">
	import axios from 'axios'
	import timerLogo from '$lib/assets/timer-logo.png'
	import Sidebar from '$lib/Sidebar.svelte'
	import { resetSolves, deleteSolves, solves, addSolves, initialSolves } from '$lib/stores/solves'
	import { displayTime, formatMegaminxScramble, generateScramble } from '$lib/utils/timer-utils'
	import { onMount } from 'svelte'
	import { session_cube_enum, type Session, type Solve } from '@prisma/client'
	import { getCube } from '$lib/utils/enum-adapter'
	import { browser } from '$app/environment'

	let scramble: string | null
	let session: Session
	let time = 0
	let state: 'stopped' | 'running' | 'ready' | 'stopping' = 'stopped'
	let interval: NodeJS.Timer
	let solvesDiv: HTMLDivElement
	let cubeType: session_cube_enum = session_cube_enum.n3x3

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
		await createSolve(time)
		scramble = await generateScramble(cubeType)
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

	async function changeCubeType(type: session_cube_enum) {
		cubeType = type
		await getSession()
		scramble = await generateScramble(type)
		if (browser) [localStorage.setItem('cube', type)]
	}

	onMount(async () => {
		if (browser) {
			changeCubeType((localStorage.getItem('cube') as session_cube_enum) || session_cube_enum.n3x3)
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
						case 'KeyD':
							await removeSolves()
							break
						case 'KeyZ':
							await deleteLastSolve()
							break
						case 'Digit1':
							changeCubeType(session_cube_enum.sq1)
							break
						case 'Digit2':
							changeCubeType(session_cube_enum.n2x2)
							break
						case 'Digit3':
							changeCubeType(session_cube_enum.n3x3)
							break
						case 'Digit4':
							changeCubeType(session_cube_enum.n4x4)
							break
						case 'Digit5':
							changeCubeType(session_cube_enum.n5x5)
							break
						case 'Digit6':
							changeCubeType(session_cube_enum.n6x6)
							break
						case 'Digit7':
							changeCubeType(session_cube_enum.n7x7)
							break
						case 'KeyM':
							changeCubeType(session_cube_enum.megaminx)
							break
						case 'KeyC':
							changeCubeType(session_cube_enum.clock)
							break
						case 'KeyP':
							changeCubeType(session_cube_enum.pyraminx)
							break
						case 'KeyB':
							changeCubeType(session_cube_enum.bld3)
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
					cubeType === session_cube_enum.megaminx &&
					'text-justify text-3xl lg:text-4xl font-mono mt-10'
				} ${cubeType === session_cube_enum.n7x7 && 'text-2xl lg:text-3xl'}`}
			>
				{#if !scramble}
					Холилт хийж байна
				{:else if cubeType === session_cube_enum.megaminx}
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
					event={getCube(cubeType)}
					visualization={cubeType === session_cube_enum.pyraminx ? '2D' : '3D'}
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
