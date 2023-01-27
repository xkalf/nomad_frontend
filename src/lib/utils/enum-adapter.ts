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
