import type { SolveStatus } from '$lib/utils/types'
import type { Solve } from '@prisma/client'
import { writable } from 'svelte/store'

export const solves = writable<Solve[]>([])

export function addSolves(solve: Solve) {
	solves.update(state => [...state, solve])
}

export function initialSolves(s: Solve[]) {
	solves.set(s)
}

export function deleteSolves(id: number) {
	solves.update(state => state.filter(i => i.id !== id))
}

export function deleteSolvesMany(ids: number[]) {
	solves.update(state => state.filter(i => !ids.includes(i.id)))
}

export function changeSolveStats(id: number, status: SolveStatus) {
	solves.update(state => {
		const index = state.findIndex(i => i.id === id)
		if (index !== -1) {
			state[index] = {
				...state[index],
				status
			}
		}

		return state
	})
}

export function resetSolves() {
	solves.update(() => [])
}
