<script lang="ts">
	import axios from 'axios'
	import timerLogo from '$lib/assets/timer-logo.png'
	import Sidebar from '$lib/Sidebar.svelte'
	import { addSolves, initialSolves, resetSolves, deleteSolves, solves } from '$lib/stores/solves'
	import { CubeType, type Session, type Solve } from '$lib/types'
	import { displayTime } from '$lib/utils/timer-utils'
	import { randomScrambleForEvent } from 'cubing/scramble'
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'

	let session: Session
	let cubeType = CubeType.n3x3
	let scramble = ''
	let time = 0
	let state: 'stopped' | 'running' | 'ready' | 'stopping' = 'stopped'
	let interval: NodeJS.Timer
	let sessionId = 0
	let solvesDiv: HTMLDivElement

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
		await generateScramble()
	}

	async function generateScramble() {
		const s = await randomScrambleForEvent(cubeType)

		if (cubeType === CubeType.Pyraminx) {
			scramble = s
				.experimentalSimplify({ cancel: true })
				.toString()
				.replace(/2/g, "'")
				.replace("''", '')
			return
		}

		scramble = s.toString()
	}

	async function getSessionData() {
		const response = await axios.get<Session>(`sessions?cube=${cubeType}`)

		initialSolves(response.data.solves)
		session = response.data
		cubeType = response.data.cube
		sessionId = response.data.id

		await generateScramble()

		if (browser) {
			localStorage.setItem('cube', cubeType)
		}
	}

	async function createSolve(time: number) {
		const response = await axios.post<Solve>('solves', {
			time,
			scramble,
			sessionId
		})

		addSolves(response.data)
	}

	async function removeSolves() {
		if (!confirm('Уг эвлүүлэлтүүдийг устгахдаа итгэлтэй байна уу?')) {
			return
		}

		const response = await axios.delete(`/sessions/${sessionId}/reset`)

		if (response.status === 200) resetSolves()
	}

	async function deleteLastSolve() {
		if (!confirm('Уг эвлүүлэлтийг устгахдаа итгэлтэй байна уу?')) {
			return
		}

		const lastId = $solves[$solves.length - 1].id

		const response = await axios.delete(`/solves/${lastId}`)
		if (response.status === 200) deleteSolves(lastId)
	}

	if (browser) {
		cubeType = (localStorage.getItem('cube') as CubeType) || CubeType.n3x3
	}

	onMount(async () => {
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
						return
					case 'KeyZ':
						await deleteLastSolve()
						return
					case 'Digit1':
						cubeType = CubeType.Sq1
						break
					case 'Digit2':
						cubeType = CubeType.n2x2
						break
					case 'Digit3':
						cubeType = CubeType.n3x3
						break
					case 'Digit4':
						cubeType = CubeType.n4x4
						break
					case 'Digit5':
						cubeType = CubeType.n5x5
						break
					case 'Digit6':
						cubeType = CubeType.n6x6
						break
					case 'Digit7':
						cubeType = CubeType.n7x7
						break
					case 'KeyM':
						cubeType = CubeType.Megaminx
						break
					case 'KeyC':
						cubeType = CubeType.Clock
						break
					case 'KeyP':
						cubeType = CubeType.Pyraminx
						break
					case 'KeyB':
						cubeType = CubeType.Bld
						break
				}

				await getSessionData()
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

		await getSessionData()
		await generateScramble()
	})
</script>

<div class="h-screen flex">
	<Sidebar {cubeType} {session} bind:solvesDiv />
	<div class="bg-[#363C41] p-4 flex flex-col w-full">
		<div class="flex justify-center pt-10">
			<img src={timerLogo} alt="Nomad Team" />
		</div>
		<div class="mt-12 flex justify-center items-center h-1/6 p-20 text-center">
			<p class="text-5xl text-scramble">
				{#await scramble then scramble}
					{scramble}
				{/await}
			</p>
		</div>
		<div class="h-3/5 flex justify-center items-center">
			<p class={`${textColor} text-[200px] leading-6 font-mono`}>{displayTime(time)}</p>
		</div>
		<div class="grid grid-cols-3">
			<div class="bg-sidebarBg col-start-3 rounded-xl">
				<scramble-display
					{scramble}
					event={cubeType}
					visualization={cubeType === CubeType.Pyraminx ? '2D' : '3D'}
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
</style>
