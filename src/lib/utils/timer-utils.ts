import { SolveStatus, type Solve, CubeType } from '@prisma/client'
import { scrambleMappper } from './types'
import Scrambow from 'scrambow'

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

export const formatTime = (solve: Solve) => {
	switch (solve.status) {
		case SolveStatus.Ok:
			return displayTime(solve.time)
		case SolveStatus.Plus2:
			return '+' + displayTime(solve.time + 2000)
		case SolveStatus.Dnf:
			return 'DNF'
	}
}

export const pad = (num: number) => {
	return num.toString().padStart(2, '0')
}

export const getBest = (arr: Solve[]): string => {
	if (arr.length === 0) {
		return displayTime(0)
	}

	const filtered = arr.filter(i => i.status !== SolveStatus.Dnf)

	if (filtered.length === 0) {
		return 'DNF'
	}

	const best = Math.min(
		...filtered
			.map(i => {
				if (i.status === SolveStatus.Plus2) {
					return { ...i, time: i.time + 2000 }
				} else {
					return i
				}
			})
			.map(i => i.time)
	)

	return displayTime(best)
}

export const getWorst = (arr: Solve[]) => {
	if (arr.length === 0) {
		return displayTime(0)
	}

	const worst = Math.max(...arr.filter(i => i.status !== SolveStatus.Dnf).map(i => i.time))

	return displayTime(worst)
}

export const getAvg = (arr: Solve[], length: number) => {
	if (arr.length < length) {
		return displayTime(0)
	}

	const array = arr.slice(-1 * length)
	const dnfs = array.filter(i => i.status === SolveStatus.Dnf)

	if (dnfs.length >= 2 && length >= 5) {
		return 'DNF'
	}

	if (dnfs.length >= 3 && length >= 25) {
		return 'DNF'
	}

	if (dnfs.length >= 4 && length >= 50) {
		return 'DNF'
	}

	if (dnfs.length >= 5 && length >= 100) {
		return 'DNF'
	}

	const sum = array.filter(i => i.status !== SolveStatus.Dnf).reduce((a, b) => (a += b.time), 0)
	const max = array.find(i => i.status === SolveStatus.Dnf)
		? 0
		: Math.max(...array.map(i => i.time))
	const min = Math.min(...array.map(i => i.time))

	const avg = (sum - min - max) / (array.length - 2)

	return displayTime(avg)
}

export const getBestAverage = (arr: Solve[], length: number): Solve[] => {
	if (arr.length < length) return []
	let best: number | undefined
	let bestArray: Solve[] = []

	for (let i = 0; i < arr.length - length + 1; i++) {
		const array = arr.slice(i, length + i)

		if (array.filter(i => i.status === SolveStatus.Dnf).length > 2) continue

		const sum = array.filter(i => i.status !== SolveStatus.Dnf).reduce((a, b) => (a += b.time), 0)
		const max = array.find(i => i.status === SolveStatus.Dnf)
			? 0
			: Math.max(...array.map(i => i.time))
		const min = Math.min(...arr.map(i => i.time))

		const avg = (sum - min - max) / (array.length - 2)

		if (!best || avg < best) {
			best = avg
			bestArray = array
		}
	}

	return bestArray
}

export function getMean(solves: Solve[]) {
	if (solves.length === 0) {
		return displayTime(0)
	}

	const filtered = solves
		.filter(i => i.status !== SolveStatus.Dnf)
		.map(i => {
			if (i.status === SolveStatus.Plus2) {
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

function getBlindWideMove() {
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

export const generateScramble = (cubeType: CubeType) => {
	const scrambow = new Scrambow.Scrambow()
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

	if (blind) {
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
