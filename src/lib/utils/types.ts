export const cubeTypes = [
	'222',
	'333',
	'444',
	'555',
	'666',
	'777',
	'minx',
	'pyram',
	'clock',
	'sq1',
	'333bf',
	'444bf',
	'555bf',
	'skewb'
] as const

export type CubeType = (typeof cubeTypes)[number]

export const userRoles = ['user', 'admin'] as const

export type UserRole = (typeof userRoles)[number]

export const solveStatuses = ['ok', '+2', 'dnf'] as const

export type SolveStatus = (typeof solveStatuses)[number]

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

export const playerMapper: Record<CubeType, string> = {
	'222': '2x2x2',
	'333': '3x3x3',
	'444': '4x4x4',
	'555': '5x5x5',
	'666': '6x6x6',
	'777': '7x7x7',
	'333bf': '3x3x3',
	'444bf': '4x4x4',
	'555bf': '5x5x5',
	sq1: 'square1',
	pyram: 'pyraminx',
	minx: 'megaminx',
	clock: 'clock',
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

export type StateType = 'stopped' | 'running' | 'ready' | 'stopping' | 'waiting'
