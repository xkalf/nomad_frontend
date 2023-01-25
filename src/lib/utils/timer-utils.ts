import { solve_status_enum, type Solve, session_cube_enum } from '@prisma/client'
import { randomScrambleForEvent } from 'cubing/scramble'
import { getCube } from './enum-adapter'

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

	const best = Math.min(...arr.filter(i => i.status !== solve_status_enum.dnf).map(i => i.time))

	return displayTime(best)
}

export const getAvg = (arr: Solve[]) => {
	if (arr.filter(i => i.status === solve_status_enum.dnf).length > 2) {
		return 'DNF'
	}

	const sum = arr.filter(i => i.status !== solve_status_enum.dnf).reduce((a, b) => (a += b.time), 0)
	const max = arr.find(i => i.status === solve_status_enum.dnf)
		? 0
		: Math.max(...arr.map(i => i.time))
	const min = Math.min(...arr.map(i => i.time))

	const avg = (sum - min - max) / (arr.length - 2)

	return displayTime(avg)
}

export function formatMegaminxScramble(scramble: string) {
	const formatted = scramble.replace(/\n/g, '<br />')
	return formatted
}

export const generateScramble = async (cubeType: session_cube_enum) => {
	const s = await randomScrambleForEvent(getCube(cubeType))

	if (cubeType === session_cube_enum.pyraminx) {
		return s.experimentalSimplify({ cancel: true }).toString().replace(/2/g, "'").replace("''", '')
	}

	return s.toString()
}
