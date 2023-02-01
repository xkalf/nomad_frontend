import type { Solve } from '@prisma/client'
import { randomScrambleForEvent } from 'cubing/scramble'
import type { CubeType } from './enum-adapter'

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

export const getAvg = (arr: Solve[]) => {
	if (arr.filter(i => i.status === 'dnf').length > 2) {
		return 'DNF'
	}

	const sum = arr.filter(i => i.status !== 'dnf').reduce((a, b) => (a += b.time), 0)
	const max = arr.find(i => i.status === 'dnf') ? 0 : Math.max(...arr.map(i => i.time))
	const min = Math.min(...arr.map(i => i.time))

	const avg = (sum - min - max) / (arr.length - 2)

	return displayTime(avg)
}

export function formatMegaminxScramble(scramble: string) {
	const formatted = scramble.replace(/\n/g, '<br />')
	return formatted
}

export const generateScramble = async (cubeType: CubeType) => {
	const s = await randomScrambleForEvent(cubeType)

	if (cubeType === 'pyram') {
		return s.experimentalSimplify({ cancel: true }).toString().replace(/2/g, "'").replace("''", '')
	}

	return s.toString()
}

export const cubeTypeMapper: Record<CubeType, string> = {
	'222': '2x2',
	'333': '3x3',
	'444': '4x4',
	'555': '5x5',
	'666': '6x6',
	'777': '7x7',
	'333bf': '3Bld',
	'444bf': '4Bld',
	'555bf': '5Bld',
	sq1: 'Sq1',
	pyram: 'Pyra',
	minx: 'Mega',
	clock: 'Clock',
	skewb: 'skewb'
}

export const shortcutMapper: { [key: string]: CubeType } = {
	Digit1: 'sq1',
	Digit2: '222',
	Digit3: '333',
	Digit4: '444',
	Digit5: '555',
	Digit6: '666',
	Digit7: '777',
	KeyM: 'minx',
	KeyC: 'clock',
	KeyP: 'pyram',
	KeyB: '333bf',
	KeyS: 'skewb'
}

export type StateType = 'stopped' | 'running' | 'ready' | 'stopping'
