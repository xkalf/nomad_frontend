import type { Solve } from '@prisma/client'
import { randomScrambleForEvent } from 'cubing/scramble'
import type { CubeType, SolveStatus } from './types'

export const displayTime = (time: number) => {
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

const pad = (num: number) => {
	return num.toString().padStart(2, '0')
}

export const getBest = (arr: Solve[]) => {
	if (arr.length === 0) {
		return displayTime(0)
	}

	const best = Math.min(...arr.filter(i => i.status !== 'dnf').map(i => i.time))

	return displayTime(best)
}

export const getWorst = (arr: Solve[]) => {
	if (arr.length === 0) {
		return displayTime(0)
	}

	const worst = Math.max(...arr.filter(i => i.status !== 'dnf').map(i => i.time))

	return displayTime(worst)
}

export const getAvg = (arr: Solve[], length: number) => {
	if (arr.length < length) {
		return displayTime(0)
	}

	const array = arr.slice(-1 * length)

	if (array.filter(i => i.status === 'dnf').length >= 2) {
		return 'DNF'
	}

	const sum = array.filter(i => i.status !== 'dnf').reduce((a, b) => (a += b.time), 0)
	const max = array.find(i => i.status === 'dnf') ? 0 : Math.max(...array.map(i => i.time))
	const min = Math.min(...array.map(i => i.time))

	const avg = (sum - min - max) / (array.length - 2)

	return displayTime(avg)
}

export const getBestAverage = (arr: Solve[], length: number) => {
	if (arr.length < length) return displayTime(0)
	let best: number | undefined

	for (let i = 0; i < arr.length - length + 1; i++) {
		const array = arr.slice(i, length + i)

		if (array.filter(i => i.status === 'dnf').length > 2) continue

		const sum = array.filter(i => i.status !== 'dnf').reduce((a, b) => (a += b.time), 0)
		const max = array.find(i => i.status === 'dnf') ? 0 : Math.max(...array.map(i => i.time))
		const min = Math.min(...arr.map(i => i.time))

		const avg = (sum - min - max) / (array.length - 2)

		if (!best) {
			best = avg
		} else if (avg < best) {
			best = avg
		}
	}

	return displayTime(best || 0)
}

export function getMean(solves: Solve[]) {
	if (solves.length === 0) {
		return displayTime(0)
	}

	const filtered = solves
		.filter(i => (i.status as SolveStatus) !== 'dnf')
		.map(i => {
			if ((i.status as SolveStatus) === '+2') {
				return (i.time += 2000)
			} else {
				return i.time
			}
		})

	if (filtered.length === 0) {
		return 'DNF'
	}

	const sum = filtered.reduce((a, b) => a + b, 0)

	return displayTime(sum / filtered.length)
}

export const generateScramble = async (cubeType: CubeType) => {
	const s = await randomScrambleForEvent(cubeType)

	if (cubeType === 'pyram') {
		return s.experimentalSimplify({ cancel: true }).toString().replace(/2/g, "'").replace("''", '')
	}

	return s.toString()
}

export function formatMegaminxScramble(scramble: string) {
	const formatted = scramble.replace(/\n/g, '<br />')
	return formatted
}

export function formatTimeInput(time: number) {
	if (Number.isInteger(time)) {
		const hours = Math.floor(time / 1000000)
		const minutes = Math.floor((time % 1000000) / 10000)
		const seconds = Math.floor((time % 10000) / 100)
		const milliSeconds = (time % 100) * 10
		return hours * 3_600_000 + minutes * 60_000 + seconds * 1000 + milliSeconds
	} else {
		const seconds = Math.floor(time)
		const milliSeconds = Math.floor((time % 1) * 1000)
		return seconds * 1000 + milliSeconds
	}
}
