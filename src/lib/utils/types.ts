import type {
	CubeType,
	DisplaySettings,
	ScrambleSettings,
	Session,
	Settings,
	Solve,
	TimerSettings
} from '@prisma/client'

export const scrambleMappper: Record<CubeType, string> = {
	N2: '222',
	N3: '333',
	N4: '444',
	N5: '555',
	N6: '666',
	N7: '777',
	Megaminx: 'minx',
	Pyraminx: 'pyram',
	Clock: 'clock',
	Sq1: 'sq1',
	Bld3: '333bf',
	Bld4: '444bf',
	Bld5: '555bf',
	Skewb: 'skewb'
}

export const cubeTypes: CubeType[] = [
	'N2',
	'N3',
	'N4',
	'N5',
	'N6',
	'N7',
	'Megaminx',
	'Pyraminx',
	'Clock',
	'Sq1',
	'Bld3',
	'Bld4',
	'Bld5',
	'Skewb'
]

export const cubeTypeMapper: Record<CubeType, string> = {
	N2: '2x2',
	N3: '3x3',
	N4: '4x4',
	N5: '5x5',
	N6: '6x6',
	N7: '7x7',
	Bld3: '3Bld',
	Bld4: '4Bld',
	Bld5: '5Bld',
	Sq1: 'Sq1',
	Pyraminx: 'Pyra',
	Megaminx: 'Mega',
	Clock: 'Clock',
	Skewb: 'skewb'
}

export const playerMapper: Record<CubeType, string> = {
	N2: '2x2x2',
	N3: '3x3x3',
	N4: '4x4x4',
	N5: '5x5x5',
	N6: '6x6x6',
	N7: '7x7x7',
	Bld3: '3x3x3',
	Bld4: '4x4x4',
	Bld5: '5x5x5',
	Sq1: 'square1',
	Pyraminx: 'pyraminx',
	Megaminx: 'megaminx',
	Clock: 'clock',
	Skewb: 'skewb'
}

export const shortcutMapper: { [key: string]: CubeType } = {
	Digit1: 'Sq1',
	Digit2: 'N2',
	Digit3: 'N3',
	Digit4: 'N4',
	Digit5: 'N5',
	Digit6: 'N6',
	Digit7: 'N7',
	KeyM: 'Megaminx',
	KeyC: 'Clock',
	KeyP: 'Pyraminx',
	KeyB: 'Bld3',
	KeyS: 'Skewb'
}

export function getCubeTypeByType(value: string) {
	return Object.keys(scrambleMappper).find(i => i === value) as CubeType
}

export type StateType = 'stopped' | 'running' | 'ready' | 'stopping' | 'waiting'

export type MySettings = Settings & {
	displaySettings: DisplaySettings | null
	timerSettings: TimerSettings | null
	scrambleSettings: ScrambleSettings | null
}

export type SessionWithSolves = Session & {
	solves: Solve[]
}

export type SessionWithSolvesCount = Session & {
	_count: {
		solves: number
	}
}
