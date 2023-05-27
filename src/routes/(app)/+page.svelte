<script lang="ts">
	/* eslint-disable no-undef */
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
	import { cubeTypeMapper, cubeTypes, shortcutMapper, type StateType } from '$lib/utils/types'
	import { generateScramble } from '$lib/utils/scramble'
	import type { CubeType, SolveStatus, Solve } from '@prisma/client'
	import { onDestroy, onMount } from 'svelte'
	import Modal from '$lib/components/Modal.svelte'
	import { sortMode } from '$lib/stores/sortMode'
	import Desktop from './Desktop.svelte'
	import Mobile from './Mobile.svelte'
	import { settings } from '$lib/stores/settings'
	import { displayTime, formatCustomTime } from '$lib/utils/timer-utils'
	import { type GanTimerConnection, GanTimerState } from 'gan-web-bluetooth'
	import type { Stackmat } from '$lib/stackmat'

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
	let nextStatus: SolveStatus | '8sec' | '12sec' = 'Ok'
	let isFetching = false
	let ganTimerConnection: GanTimerConnection
	let mobileTimerEl: HTMLDivElement
	let mobileScrambleEl: HTMLDivElement
	let desktopTimerEL: HTMLDivElement
	let desktopScrambleEl: HTMLDivElement
	let isStateOpen = false
	let isCubeTypeOpen = false
	let customTimeRef: HTMLInputElement
	let customTime: string | undefined = undefined
	let isCustomTimeModalOpen = false
	let stackmatTimer: Stackmat

	const exceptTags = ['INPUT', 'BUTTON', 'TEXTAREA']
	const bldTypes: CubeType[] = ['Bld3', 'Bld4', 'Bld5']

	$: textColor = setTextColor(state)
	session.subscribe(value => {
		if (value?.cube && browser) {
			scramble = generateScramble(value.cube)
		}
	})
	$: ganTimerConnection &&
		ganTimerConnection.events$.subscribe(timerEvent => {
			switch (timerEvent.state) {
				case GanTimerState.HANDS_ON:
					updateState('waiting')
					break
				case GanTimerState.HANDS_OFF:
					if (checkInspection()) {
						startInspection()
						updateState('inspection')
					} else {
						updateState('stopped')
					}
					break
				case GanTimerState.RUNNING:
					startTime()
					updateState('running')
					break
				case GanTimerState.STOPPED:
					if (timerEvent.recordedTime) stopTime(timerEvent.recordedTime.asTimestamp)
					break
				case GanTimerState.IDLE:
					updateState('stopped')
					timerText = displayTime(0)
					break
				case GanTimerState.GET_SET:
					updateState('ready')
					break
			}
		})
	$: props = {
		scramble,
		textColor,
		nextStatus:
			nextStatus === '8sec' && state === 'inspection'
				? '8 sec'
				: nextStatus === '12sec' && state === 'inspection'
				? '12sec'
				: ''
	}

	function setTextColor(state: StateType) {
		if (state === 'ready' || state === 'inspectionReady') {
			return 'text-green-400'
		} else if (state === 'waiting' || state === 'inspectionWaiting') {
			return 'text-red-500'
		} else {
			return 'text-primary'
		}
	}

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
				case 'Default':
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
			} else if (inspectionSeconds < 4) {
				nextStatus = '12sec'
				timerText = inspectionSeconds.toString()
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

	async function stopTime(customTime: number | undefined = undefined) {
		const internalTime = customTime || time
		clearInterval(interval)
		newScramble()
		timerText = displayTime(internalTime)
		await createSolve(
			internalTime,
			nextStatus === '8sec' || nextStatus === '12sec' ? 'Ok' : nextStatus
		)
		nextStatus = 'Ok'
	}

	async function createSolve(time: number, nState: SolveStatus = 'Ok'): Promise<boolean> {
		if (isFetching || !currentScramble) return false

		isFetching = true

		const response: Solve = await fetch('/api/solve', {
			method: 'POST',
			body: JSON.stringify({
				time,
				scramble: currentScramble,
				sessionId: $session.id,
				status: nState
			})
		}).then(res => res.json())

		isFetching = false

		addSolves(response)

		return true
	}

	async function removeSolves() {
		if (isFetching) return

		isFetching = true
		const response = await fetch(`/api/session/${$session.id}/reset`, {
			method: 'DELETE'
		})
		const data = await response.json()

		isFetching = false

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

	async function deleteLastSolve(count = 1) {
		if (isFetching) return
		const sortedSolves = getSortedLastSolve(count)

		const ids = sortedSolves.map(i => i.id)

		isFetching = true
		const response = await (
			await fetch(`/api/solve`, { method: 'DELETE', body: JSON.stringify({ ids }) })
		).json()
		isFetching = false

		if (response.success === true) {
			deleteSolvesMany(ids)
			deleteLastModalOpen = false
		}
	}

	async function changeCubeType(type: CubeType) {
		if (browser) {
			const id = localStorage.getItem(type)
			if (id) {
				await getSessionById(parseInt(id))
				if ($session.cube !== type) {
					await getSessionByCube(type)
				}
			} else {
				await getSessionByCube(type)
			}
		}
		setCubeType(type)
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

	async function createCustomSolve() {
		if (!customTime || isFetching) {
			customTime = undefined
			isCustomTimeModalOpen = false
			return
		}
		const time = formatCustomTime(customTime)

		if (!time) {
			customTime = undefined
			return
		}

		isFetching = true
		const result = await createSolve(time)
		isFetching = false

		if (result) {
			newScramble()
			timerText = displayTime(formatCustomTime(customTime) || 0)
			customTime = undefined
			isCustomTimeModalOpen = false
		}
	}

	async function updateLastSolve(status: SolveStatus) {
		const last = getSortedLastSolve(1)[0]

		if (last.status === status || isFetching) return

		isFetching = true

		const response = await fetch(`/api/solve/${last.id}`, {
			method: 'PUT',
			body: JSON.stringify({ status })
		})
		const data = await response.json()

		isFetching = false

		if (data.success === true) changeSolveStats(data.solve)
	}

	function eventUp() {
		clearTimeout(timeOutRef)
		clearTimeout(inspectionWaitRef)

		if (state === 'ready') {
			startTime()
			updateState('running')
		} else if ($settings.useWcaInspection !== 'Never' && state === 'inspectionReady') {
			startInspection()
			updateState('inspection')
		} else if (state === 'waiting' && checkInspection()) {
			updateState('inspection')
		} else if (state !== 'stopping') {
			updateState('stopped')
		}
	}

	function checkInspection() {
		return (
			$settings.useWcaInspection === 'Always' ||
			($settings.useWcaInspection === 'ExceptBLD' && !bldTypes.includes($cubeType))
		)
	}

	function eventDown(isTouch = false) {
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
			if (checkInspection()) {
				setInspectionReady()
			} else {
				setReady()
			}
		} else if (state === 'inspection') {
			setReady()
		} else if (state === 'running') {
			stopTime()
			updateState('stopping')

			setTimeout(() => {
				updateState('stopped')
			}, 300)
		}
	}

	function handleKeyUp(e: KeyboardEvent) {
		if (e.key === ' ' && $settings.enteringTimes === 'Timer') {
			if (e.target instanceof HTMLElement && exceptTags.includes(e.target.tagName)) {
				return
			}

			eventUp()
		}
	}

	async function handleKeyDown(e: KeyboardEvent) {
		if (e.altKey) {
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
				if (shortcutMapper[e.code] === $cubeType) return
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
		} else if (e.key === ' ' && $settings.enteringTimes === 'Timer') {
			if (e.target instanceof HTMLElement && exceptTags.includes(e.target.tagName)) {
				return
			}

			eventDown()
		}

		if (state === 'running') {
			e.preventDefault()

			stopTime()
			updateState('stopping')

			setTimeout(() => {
				updateState('stopped')
			}, 300)
		}
	}

	async function connectBluetoothTimer() {
		const { connectGanTimer } = await import('gan-web-bluetooth')
		ganTimerConnection = await connectGanTimer()
		timerText = displayTime((await ganTimerConnection.getRecordedTimes()).displayTime.asTimestamp)
	}

	function isReady() {
		const states: StateType[] = ['stopped', 'waiting', 'inspectionWaiting']
		return states.includes(state)
	}

	async function connectStackmat() {
		const { Stackmat } = await import('$lib/stackmat')
		stackmatTimer = new Stackmat()

		stackmatTimer.start()

		stackmatTimer.on('packetReceived', () => {
			console.log('packet recieved')
		})

		stackmatTimer.on('timerConnected', () => {
			console.log('timer connected')
		})

		stackmatTimer.on('leftHandDown', () => {
			console.log('left hand down')
		})
	}

	async function addGestures() {
		const elements = [mobileTimerEl, desktopTimerEL]
		const scrambleElements = [mobileScrambleEl, desktopScrambleEl]
		const Hammer = await import('hammerjs')

		scrambleElements.forEach(i => {
			const sHammer = new Hammer.Manager(i)

			sHammer.add(new Hammer.Swipe({ event: 'swipeLeft', direction: Hammer.DIRECTION_LEFT }))
			sHammer.add(new Hammer.Swipe({ event: 'swipeRight', direction: Hammer.DIRECTION_RIGHT }))

			sHammer.on('swipeRight', () => {
				if (isReady()) newScramble()
			})
			sHammer.on('swipeLeft', () => {
				if (isReady()) getLastScramble()
			})
		})

		elements.forEach(i => {
			if ($settings.enteringTimes === 'Timer') {
				i.addEventListener('touchstart', () => eventDown(true))
				i.addEventListener('touchend', () => eventUp())
			}

			const hammer = new Hammer.Manager(i)
			hammer.add(new Hammer.Tap({ event: 'doubleTap', taps: 2, interval: 700 }))
			hammer.add(new Hammer.Tap({ event: 'doubleMultiTap', pointers: 2, taps: 2, interval: 700 }))
			hammer.add(new Hammer.Swipe({ event: 'swipeRight', direction: Hammer.DIRECTION_RIGHT }))
			hammer.add(new Hammer.Swipe({ event: 'swipeLeft', direction: Hammer.DIRECTION_LEFT }))
			hammer.add(
				new Hammer.Swipe({ event: 'multiSwipeUp', direction: Hammer.DIRECTION_UP, pointers: 2 })
			)
			hammer.add(new Hammer.Swipe({ event: 'swipeDown', direction: Hammer.DIRECTION_DOWN }))

			hammer.on('doubleTap', e => {
				e.preventDefault()
				if (isReady()) isStateOpen = true
			})

			hammer.on('doubleMultiTap', () => {
				if (isReady()) openDeleteAllModal()
			})

			hammer.on('swipeRight', () => {
				if (isReady()) newScramble()
			})

			hammer.on('swipeLeft', () => {
				if (isReady()) openDeleteLastModal()
			})

			hammer.on('multiSwipeUp', () => {
				if (isReady()) isCubeTypeOpen = true
			})

			hammer.on('swipeDown', () => {
				if (isReady()) {
					customTime = undefined
					isCustomTimeModalOpen = true
					customTimeRef.click()
					customTimeRef.focus()
				}
			})
		})
	}

	function updateState(input: StateType) {
		state = input
	}

	function openDeleteLastModal() {
		deleteLastModalOpen = true
	}

	function openDeleteAllModal() {
		deleteAllModalOpen = true
	}

	onMount(async () => {
		if (browser) {
			window.addEventListener('keyup', handleKeyUp)
			window.addEventListener('keydown', handleKeyDown)

			if ($settings.enteringTimes === 'Stackmat') {
				connectStackmat()
			}

			addGestures()
		}
	})

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keyup', handleKeyUp)
			window.removeEventListener('keydown', handleKeyDown)
			const elements = [mobileTimerEl, desktopTimerEL]
			elements.forEach(i => {
				i.removeEventListener('touchstart', () => eventDown(true))
				i.removeEventListener('touchend', () => eventUp())
			})
			if (ganTimerConnection) ganTimerConnection.disconnect()
			if (stackmatTimer) stackmatTimer.stop()
		}
	})
</script>

<svelte:head>
	<title>Хугацаа хэмжигч</title>
</svelte:head>

<div class="hidden md:block">
	<Desktop
		{...props}
		{timerText}
		bind:timerContainer={desktopTimerEL}
		bind:scrambleContainer={desktopScrambleEl}
		{changeCubeType}
		{newScramble}
		{eventDown}
		{eventUp}
		{connectBluetoothTimer}
		{createSolve}
	/>
</div>
<div class="block md:hidden">
	<Mobile
		{...props}
		bind:timerText
		bind:timerEl={mobileTimerEl}
		bind:scrambleEl={mobileScrambleEl}
	/>
</div>

<Modal okFunction={() => deleteLastSolve(deleteCount)} bind:isOpen={deleteLastModalOpen}>
	<p class="text-lg text-primary">Сүүлийн хэдэн эвлүүлэлтийг устгах уу?</p>
	<input
		bind:value={deleteCount}
		class="mt-2 w-full rounded-lg bg-secondary p-2 pl-3 text-lg text-white"
		type="text"
	/>
</Modal>

<Modal okFunction={removeSolves} bind:isOpen={deleteAllModalOpen}>
	<p class="text-lg text-primary">Энэ session-ийн эвлүүлэлтүүдийг устгах уу?</p>
</Modal>

<Modal okFunction={createCustomSolve} bind:isOpen={isCustomTimeModalOpen} mode="create">
	<p class="text-lg text-primary">Эвлүүлэлтийн хугацаа</p>
	<input
		bind:value={customTime}
		bind:this={customTimeRef}
		class="mt-2 w-full rounded-lg bg-secondary p-2 pl-3 text-lg text-white"
		type="string"
		inputmode="numeric"
	/>
</Modal>

<div
	class={`${
		isCubeTypeOpen ? 'block' : 'hidden'
	} absolute top-1/2 left-1/2 w-64 -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-primary`}
>
	<ul class="max-h-64 overflow-y-auto rounded-xl bg-white">
		{#each cubeTypes as type}
			<li class="border-b border-secondary py-3 last:border-none">
				<button
					class="w-full"
					on:click={() => {
						changeCubeType(type)
						isCubeTypeOpen = false
					}}>{cubeTypeMapper[type]}</button
				>
			</li>
		{/each}
	</ul>

	<button
		class="mt-2 w-full rounded-xl bg-white py-3"
		on:click={() => {
			isCubeTypeOpen = false
		}}>Cancel</button
	>
</div>

<div
	class={`${
		isStateOpen ? 'block' : 'hidden'
	} absolute top-1/2 left-1/2 w-64 -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-primary`}
>
	<ul class="max-h-64 overflow-y-auto rounded-xl bg-white">
		<li class="border-b border-secondary py-3">
			<button
				class="w-full"
				on:click={async () => {
					await updateLastSolve('Plus2')
					isStateOpen = false
				}}>+2</button
			>
		</li>
		<li class="border-b border-secondary py-3">
			<button
				class="w-full"
				on:click={async () => {
					await updateLastSolve('Dnf')
					isStateOpen = false
				}}>DNF</button
			>
		</li>
		<li class="border-b border-secondary py-3">
			<button
				class="w-full"
				on:click={async () => {
					await updateLastSolve('Ok')
					isStateOpen = false
				}}>OK</button
			>
		</li>
		<li class="py-3">
			<button
				class="w-full"
				on:click={async () => {
					await connectBluetoothTimer()
					isStateOpen = false
				}}>Gan Timer</button
			>
		</li>
	</ul>

	<button
		class="mt-2 w-full rounded-xl bg-white py-3"
		on:click={() => {
			isStateOpen = false
		}}>Cancel</button
	>
</div>
