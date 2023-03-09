import { getBestSolve } from '$lib/utils/timer-utils'
import type { Solve } from '@prisma/client'
import { writable } from 'svelte/store'
import { solves } from './solves'

export const bestSolve = writable<
	Solve & {
		open: boolean
	}
>()

export function toggleBestSolve() {
	bestSolve.update(i => ({ ...i, open: true }))
}

solves.subscribe(i => {
	const best = getBestSolve(i)
	bestSolve.set({ ...best, open: false })
})
