import type { Solve } from '@prisma/client'
import { writable } from 'svelte/store'

export const solves = writable<Solve[]>([])

export function addSolves(solve: Solve) {
	solves.update(state => [...state, solve])
}

export function addManySolves(s: Solve[]) {
	solves.update(state => [...state, ...s])
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

export function changeSolveStats(solve: Solve) {
	solves.update(state => [
		...state.map(i => {
			if (i.id === solve.id) {
				return solve
			}
			return i
		})
	])
}

export function resetSolves() {
	solves.update(() => [])
}
