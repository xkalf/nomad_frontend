import { Prisma, type CubeType, VoiceAlert } from '@prisma/client'

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

export const scrambleSizeMapper: Record<CubeType, string> = {
	N2: 'text-2xl md:text-5xl',
	N3: 'text-2xl md:text-5xl',
	N4: 'text-base md:text-5xl',
	N5: 'text-sm md:text-5xl',
	N6: 'text-xs md:text-2xl lg:text-3xl',
	N7: 'text-xs md:text-2xl lg:text-3xl',
	Bld3: 'text-2xl md:text-5xl',
	Bld4: 'text-base md:text-5xl',
	Bld5: 'text-sm md:text-5xl',
	Sq1: 'text-2xl md:text-5xl',
	Pyraminx: 'text-2xl md:text-5xl',
	Megaminx: 'text-xs md:text-lg lg:text-2xl 2xl:text-3xl text-justify font-mono',
	Clock: 'text-2xl md:text-5xl',
	Skewb: 'text-2xl md:text-5xl'
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

export type StateType =
	| 'stopped'
	| 'running'
	| 'ready'
	| 'stopping'
	| 'waiting'
	| 'inspection'
	| 'inspectionWaiting'
	| 'inspectionReady'

const sessionWithSolves = Prisma.validator<Prisma.SessionArgs>()({
	include: {
		solves: true
	}
})

export type SessionWithSolves = Prisma.SessionGetPayload<typeof sessionWithSolves>

const sessionWithSolvesCount = Prisma.validator<Prisma.SessionArgs>()({
	include: {
		_count: {
			select: { solves: true }
		}
	}
})

export type SessionWithSolvesCount = Prisma.SessionGetPayload<typeof sessionWithSolvesCount>

const solveWithDetail = Prisma.validator<Prisma.SolveArgs>()({
	include: {
		twoLookSolve: true,
		cfopSolve: true
	}
})

export type SolveWithDetail = Prisma.SolveGetPayload<typeof solveWithDetail>

export const voiceAlertMapper: Record<VoiceAlert, string> = {
	Sergelenbat: 'Сэргэлэнбат',
	None: 'Үгүй',
	Aliya: 'Алия'
}
