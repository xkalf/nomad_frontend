import type { CubeType } from '$lib/utils/types'
import { writable } from 'svelte/store'

export const cubeType = writable<CubeType>('333')

export function setCubeType(c: CubeType) {
	cubeType.set(c)
}
