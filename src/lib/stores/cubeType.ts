import type { CubeType } from '@prisma/client'
import { writable } from 'svelte/store'

export const cubeType = writable<CubeType>('N3')

export function setCubeType(c: CubeType) {
	cubeType.set(c)
}
