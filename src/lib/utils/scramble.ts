import type { CubeType } from '@prisma/client'
import { scrambleMappper } from './types'
import { Scrambow } from 'scrambow'

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
