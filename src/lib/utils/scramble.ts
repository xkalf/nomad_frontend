import type { CubeType } from '@prisma/client'
import { scrambleMappper } from './types'

export async function generateScramble(cubeType: CubeType): Promise<string> {
	const { Scrambow } = await import('scrambow')
	const scrambow = new Scrambow()
	const bldTypes: CubeType[] = ['Bld3', 'Bld4', 'Bld5']
	const blindTypeMapper: { [key: string]: CubeType } = {
		Bld3: 'N3'
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
