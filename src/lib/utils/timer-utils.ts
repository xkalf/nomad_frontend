import type { Solve } from '@prisma/client'

export function displayTime(time: number): string {
	const hours = Math.floor(time / 3_600_000) // 1 Hour = 3600000 Milliseconds
	const minutes = Math.floor((time % 3_600_000) / 60_000) // 1 Minute = 60000 Milliseconds
	const seconds = Math.floor(((time % 3_600_000) % 60_000) / 1000) // 1 Second = 1000 Milliseconds
	const milliseconds = Math.floor(((time % 3_600_000) % 60_000) % 1000)

	let base = `${milliseconds.toString().padStart(3, '0')}`

	base = base.slice(0, -1)

	if (hours > 0) {
		base = `${hours}:${pad(minutes)}:${pad(seconds)}.${base}`
	} else if (minutes > 0) {
		base = `${minutes}:${pad(seconds)}.${base}`
	} else {
		base = `${seconds}.${base}`
	}

	return base
}

export function formatTime(solve: Solve): string {
	switch (solve.status) {
		case 'Ok':
			return displayTime(solve.time)
		case 'Plus2':
			return '+' + displayTime(solve.time + 2000)
		case 'Dnf':
			return 'DNF'
	}
}

export function pad(num: number): string {
	return num.toString().padStart(2, '0')
}

export function getBestSolve(arr: Solve[]): Solve {
	const adjustedSolves = arr.slice().map(i => ({
		...i,
		time: getAdjustedTime(i)
	}))
	const sortedSolves = adjustedSolves.sort((a, b) => a.time - b.time)
	return sortedSolves.slice(0, 1)[0]
}

export function getBest(best: Solve & { open: boolean }): string {
	if (typeof best.time === 'undefined') return displayTime(0)
	return best.time !== Number.MAX_SAFE_INTEGER ? displayTime(best.time) : 'DNF'
}

export function getWorst(arr: Solve[]): string {
	if (arr.length === 0) {
		return displayTime(0)
	}

	const worst = Math.max(
		...arr
			.slice()
			.filter(i => i.status !== 'Dnf')
			.map(i => getAdjustedTime(i))
	)

	return displayTime(worst)
}

function getAdjustedTime(solve: Solve): number {
	switch (solve.status) {
		case 'Ok':
			return solve.time
		case 'Plus2':
			return solve.time + 2000
		case 'Dnf':
			return Number.MAX_SAFE_INTEGER
	}
}

export function getAverageTime(arr: Solve[], length: number): number {
	if (arr.length < length) {
		return 0
	}

	const array = arr.slice(-1 * length)
	const dnfs = array.filter(i => i.status === 'Dnf')

	if (dnfs.length >= Math.floor(length / 25) + 2 && length >= 25) {
		return Number.MAX_SAFE_INTEGER
	}

	if (dnfs.length >= 2 && length >= 5) {
		return Number.MAX_SAFE_INTEGER
	}

	const adjustedSolves = array.slice().map(i => ({
		...i,
		time: getAdjustedTime(i)
	}))
	const sortedSolves = adjustedSolves.slice().sort((a, b) => a.time - b.time)
	const filteredSolves = sortedSolves.slice(1, -1)
	const sum = filteredSolves.reduce((a, b) => a + b.time, 0)

	return sum / filteredSolves.length
}

export function getAvg(arr: Solve[], length: number): string {
	const time = getAverageTime(arr, length)
	if (time === Number.MAX_SAFE_INTEGER) return 'DNF'
	return time >= 0 ? displayTime(time) : 'DNF'
}

export function getBestAverage(arr: Solve[], length: number): Solve[] {
	if (arr.length < length) return []
	let best: number | undefined
	let bestArray: Solve[] = []

	for (let i = 0; i < arr.length - length + 1; i++) {
		const array = arr.slice(i, length + i)

		const avg = getAverageTime(array, length)

		if (!best || (avg < best && avg >= 0)) {
			best = avg
			bestArray = array
		}
	}

	return bestArray
}

export function getMean(solves: Solve[]): string {
	if (solves.length === 0) {
		return displayTime(0)
	}

	const filtered = solves
		.slice()
		.filter(i => i.status !== 'Dnf')
		.map(i => ({
			...i,
			time: getAdjustedTime(i)
		}))

	if (filtered.length === 0) {
		return 'DNF'
	}

	const sum = filtered.reduce((a, b) => a + b.time, 0)

	return displayTime(sum / filtered.length)
}

export function formatCustomTime(timeString: string) {
	const isNumber = /^\d+$/.test(timeString)

	if (isNumber) {
		return formatTimeInput(parseInt(timeString))
	} else {
		return formatStringToMilliSeconds(timeString)
	}
}

export function formatStringToMilliSeconds(timeString: string) {
	const regex = /^((\d{1,2}:)?\d{1,2}:)?\d{1,2}\.\d{1,2}$/gm

	if (!regex.exec(timeString)) {
		return
	}

	const parts = timeString.split(':').reverse()

	if (parts.length > 3) {
		return
	}

	const s = parts.shift()

	if (!s) return

	const [seconds, milliseconds] = s.split('.')

	let totalMilliseconds = parseInt(seconds) * 1000 + parseInt(milliseconds) * 10

	if (parts.length === 1) {
		const [minutes] = parts
		totalMilliseconds += parseInt(minutes) * 60 * 1000
	} else if (parts.length === 2) {
		const [minutes, hours] = parts
		totalMilliseconds += parseInt(minutes) * 60 * 1000
		totalMilliseconds += parseInt(hours) * 60 * 60 * 1000
	}

	return totalMilliseconds
}

export function formatTimeInput(time: number) {
	const hours = Math.floor(time / 1000000)
	const minutes = Math.floor((time % 1000000) / 10000)
	const seconds = Math.floor((time % 10000) / 100)
	const milliSeconds = (time % 100) * 10
	return hours * 3_600_000 + minutes * 60_000 + seconds * 1000 + milliSeconds
}

export function checkBestAverage(solves: Solve[], length: number) {
	if (
		getAverageTime(solves, length) === getAverageTime(getBestAverage(solves, length), length) &&
		getAverageTime(solves, length) > 0
	) {
		return 'text-green-400'
	} else {
		return ''
	}
}
