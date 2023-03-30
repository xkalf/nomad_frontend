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
	import { generateScramble } from '$lib/utils/scramble'
	import type { CubeType, SolveStatus, Solve } from '@prisma/client'
	import { onMount } from 'svelte'
	import Modal from '$lib/components/Modal.svelte'
	import { sortMode } from '$lib/stores/sortMode'
	import Desktop from './Desktop.svelte'
	import Mobile from './Mobile.svelte'
	import { settings } from '$lib/stores/settings'
	import { displayTime } from '$lib/utils/timer-utils'

	let scramble: string = generateScramble($cubeType)
	let currentScramble: string | null = null
	let lastScramble: string | null = null
	let time = 0
	let state: StateType = 'stopped'
	let interval: NodeJS.Timer
	let deleteAllModalOpen = false
	let deleteLastModalOpen = false
	let deleteCount = 1
	let timeOutRef: NodeJS.Timeout
	let inspectionWaitRef: NodeJS.Timeout
	let timerText: string = displayTime(0)
	let inspectionRef: NodeJS.Timer
	let inspectionSeconds: number
	let nextStatus: SolveStatus | '8sec' = 'Ok'
	const bldTypes: CubeType[] = ['Bld3', 'Bld4', 'Bld5']

	function setTextColor(state: StateType) {
		if (state === 'ready' || state === 'inspectionReady') {
			return 'text-green-500'
		} else if (state === 'waiting' || state === 'inspectionWaiting') {
			return 'text-red-500'
		} else {
			return 'text-primary'
		}
	}

	$: textColor = setTextColor(state)

	function startTime() {
		if (!$session) {
			return
		}

		clearInterval(inspectionRef)

		const startedTime = Date.now()
		interval = setInterval(() => {
			const current = Date.now()
			time = current - startedTime

			switch ($settings.timerUpdate) {
				case 'None':
					timerText = 'Solving'
					break
				case 'Seconds':
					timerText = displayTime(time).slice(0, -3)
					break
				case 'Point':
					timerText = displayTime(time).slice(0, -1)
					break
				case 'Update':
					timerText = displayTime(time)
					break
				case 'Inspection':
					timerText = 'Solving'
					break
				default:
					timerText = displayTime(time)
					break
			}
		}, 1)
	}

	function startInspection() {
		inspectionSeconds = 15

		if ($settings.timerUpdate === 'None') {
			timerText = 'inspection'
		} else {
			timerText = '15'
		}

		inspectionRef = setInterval(() => {
			inspectionSeconds -= 1

			if (inspectionSeconds <= -2) {
				nextStatus = 'Dnf'
				timerText = 'DNF'
			} else if (inspectionSeconds <= 0) {
				nextStatus = 'Plus2'
				timerText = '+2'
			} else if (inspectionSeconds < 8) {
				nextStatus = '8sec'
				timerText = inspectionSeconds.toString()
			} else if ($settings.timerUpdate === 'None') {
				timerText = 'inspection'
			} else {
				timerText = inspectionSeconds.toString()
			}
		}, 1000)
	}

	async function stopTime() {
		clearInterval(interval)
		timerText = displayTime(time)
		newScramble()
		await createSolve(time, nextStatus === '8sec' ? 'Ok' : nextStatus)
		nextStatus = 'Ok'
	}

	async function createSolve(time: number, nState: SolveStatus = 'Ok') {
		const response = await fetch('/api/solve', {
			method: 'POST',
			body: JSON.stringify({
				time,
				scramble,
				sessionId: $session.id,
				status: nState
			})
		})

		const result: Solve = await response.json()

		addSolves(result)
	}

	async function removeSolves() {
		const response = await fetch(`/api/session/${$session.id}/reset`, {
			method: 'DELETE'
		})
		const data = await response.json()

		if (data.success === true) {
			resetSolves()
			deleteAllModalOpen = false
		}
	}

	function getSortedLastSolve(count = 1) {
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

		return sortedSolves
	}

	async function deleteLastSolve(count: number = 1) {
		const sortedSolves = getSortedLastSolve(count)

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

	function newScramble() {
		lastScramble = scramble
		if (currentScramble) {
			scramble = currentScramble
		} else {
			scramble = generateScramble($cubeType)
		}
		currentScramble = null
	}

	function getLastScramble() {
		if (!lastScramble) return

		currentScramble = scramble
		scramble = lastScramble
	}

	async function updateLastSolve(status: SolveStatus) {
		const last = getSortedLastSolve(1)[0]

		if (last.status === status) {
			return
		}

		const response = await fetch(`/api/solve/${last.id}`, {
			method: 'PUT',
			body: JSON.stringify({ status })
		})
		const data = await response.json()

		if (data.success === true) changeSolveStats(data.solve)
	}

	session.subscribe(value => {
		if (value?.cube && browser) {
			scramble = generateScramble(value.cube)
		}
	})

	function eventUp() {
		clearTimeout(timeOutRef)
		clearTimeout(inspectionWaitRef)

		if (state === 'ready') {
			startTime()
			updateState('running')
		} else if (state === 'running') {
			stopTime()
			updateState('stopping')

			setTimeout(() => {
				updateState('stopped')
			}, 300)
		} else if ($settings.useWcaInspection !== 'Never' && state === 'inspectionReady') {
			startInspection()
			updateState('inspection')
		} else if (
			state === 'waiting' &&
			($settings.useWcaInspection === 'Always' ||
				($settings.useWcaInspection === 'ExceptBLD' && !bldTypes.includes($cubeType)))
		) {
			updateState('inspection')
		} else {
			updateState('stopped')
		}
	}

	function eventDown(isTouch: boolean = false) {
		const freezeTime = isTouch && $settings.freezeTime === 0 ? 300 : $settings.freezeTime

		function setReady() {
			updateState('waiting')
			timeOutRef = setTimeout(() => {
				updateState('ready')
			}, freezeTime)
		}

		function setInspectionReady() {
			if (isTouch) {
				updateState('inspectionWaiting')
				inspectionWaitRef = setTimeout(() => {
					updateState('inspectionReady')
				}, 300)
			} else {
				updateState('inspectionReady')
			}
		}

		if (state === 'stopped') {
			if (
				$settings.useWcaInspection === 'Never' ||
				($settings.useWcaInspection === 'ExceptBLD' && bldTypes.includes($cubeType))
			) {
				setReady()
			} else if (
				$settings.useWcaInspection === 'Always' ||
				($settings.useWcaInspection === 'ExceptBLD' && !bldTypes.includes($cubeType))
			) {
				setInspectionReady()
			}
		} else if (state === 'inspection') {
			setReady()
		}
	}

	onMount(async () => {
		if (browser) {
			const exceptTags = ['INPUT', 'BUTTON', 'TEXTAREA']

			window.addEventListener('keyup', e => {
				if (e.target instanceof HTMLElement && exceptTags.includes(e.target.tagName)) {
					return
				}

				if (e.key === ' ') {
					eventUp()
				}
			})

			window.addEventListener('keydown', async e => {
				if (e.target instanceof HTMLElement && exceptTags.includes(e.target.tagName)) {
					return
				}

				if (e.key === ' ') {
					eventDown()
				} else if (e.altKey) {
					switch (e.code) {
						case 'ArrowLeft':
							e.preventDefault()
							getLastScramble()
							return
						case 'ArrowRight':
							e.preventDefault()
							newScramble()
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
					updateState('stopping')

					setTimeout(() => {
						updateState('stopped')
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

	const functions = {
		changeCubeType,
		newScramble,
		getLastScramble,
		openDeleteLastModal,
		openDeleteAllModal,
		updateLastSolve,
		createSolve,
		eventDown,
		eventUp
	}

	$: props = {
		timerText,
		scramble,
		textColor,
		nextStatus: nextStatus === '8sec' && state === 'inspection' ? '8 sec' : ''
	}
</script>

<svelte:head>
	<title>Хугацаа хэмжигч</title>
</svelte:head>

<div class="hidden md:block">
	<Desktop {...props} {changeCubeType} {eventUp} {eventDown} />
</div>
<div class="block md:hidden">
	<Mobile {...props} {...functions} {state} />
</div>

<Modal
	okFunction={() => deleteLastSolve(deleteCount)}
	cancelFunction={() => {
		deleteLastModalOpen = false
	}}
	isOpen={deleteLastModalOpen}
>
	<p class="text-lg text-primary">Сүүлийн хэдэн эвлүүлэлтийг устгах уу?</p>
	<input
		bind:value={deleteCount}
		class="mt-2 w-full rounded-lg bg-secondary p-2 pl-3 text-lg text-white"
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
	<p class="text-lg text-primary">Энэ session-ийн эвлүүлэлтүүдийг устгах уу?</p>
</Modal>
