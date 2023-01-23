export enum CubeType {
	n2x2 = '222',
	n3x3 = '333',
	n4x4 = '444',
	n5x5 = '555',
	n6x6 = '666',
	n7x7 = '777',
	Megaminx = 'minx',
	Pyraminx = 'pyram',
	Clock = 'clock',
	Sq1 = 'sq1',
	Bld = '333bf',
	Bld4 = '444bf',
	Bld5 = '555bf'
}

export enum SolveStatus {
	Ok = 'ok',
	Plus2 = '+2',
	Dnf = 'dnf'
}

export interface User {
	id: number
	firstname: string
	lastname: string
	birthdate: string
}

export interface Session {
	id: number
	name: string
	cube: CubeType
	user: User
	solves: Solve[]
	createdAt: Date
	updatedAt: Date
}

export interface Solve {
	id: number
	scramble: string
	time: number
	status: SolveStatus
	description?: string
	sessionId: number
}
