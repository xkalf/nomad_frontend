import type { Solve, CubeType } from '@prisma/client'
import { scrambleMappper } from './types'
import s from 'scrambow'

const { Scrambow } = s

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

export function getBest(arr: Solve[]): string {
	if (arr.length === 0) {
		return displayTime(0)
	}

	const filtered = arr.filter(i => i.status !== 'Dnf')

	if (filtered.length === 0) {
		return 'DNF'
	}

	const best = Math.min(...filtered.map(i => getAdjustedTime(i)))

	return displayTime(best)
}

export function getWorst(arr: Solve[]): string {
	if (arr.length === 0) {
		return displayTime(0)
	}

	const worst = Math.max(...arr.filter(i => i.status !== 'Dnf').map(i => getAdjustedTime(i)))

	return displayTime(worst)
}

function getAdjustedTime(solve: Solve): number {
	switch (solve.status) {
		case 'Ok':
			return solve.time
		case 'Plus2':
			return (solve.time += 2000)
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

	if (dnfs.length >= 2 && length >= 5) {
		return -1
	}

	if (dnfs.length >= Math.floor(length / 25) + 2 && length >= 25) {
		return -1
	}

	const adjustedSolves = array.map(i => ({
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

function getBlindWideMove(): string {
	const moves = ['Uw', 'Lw', 'Rw', 'Fw']
	const move = moves[Math.floor(Math.random() * moves.length)]
	const randState = Math.random()

	if (randState < 0.33) {
		return `${move}'`
	} else if (randState < 0.66) {
		return `${move}2`
	}

	return move
}

export function generateScramble(cubeType: CubeType): string {
	const scrambow = new Scrambow()
	const bldTypes: CubeType[] = ['Bld3', 'Bld4', 'Bld5']
	const blindTypeMapper: { [key: string]: CubeType } = {
		Bld3: 'N3',
		Bld4: 'N4',
		Bld5: 'N5'
	}
	let blind = false

	if (bldTypes.includes(cubeType)) {
		cubeType = blindTypeMapper[cubeType.toString()] as CubeType
		blind = true
	}

	let scramble = scrambow.setType(scrambleMappper[cubeType]).get()[0].scramble_string

	if (blind && cubeType == 'Bld3') {
		scramble += ' ' + getBlindWideMove()
	}

	return scramble
}

export function formatMegaminxScramble(scramble: string) {
	return scramble.replace(/\n/g, '<br />')
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
