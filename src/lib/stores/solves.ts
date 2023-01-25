import type { Solve, solve_status_enum } from '@prisma/client'
import { writable } from 'svelte/store'

export const solves = writable<Solve[]>([])

export function addSolves(solve: Solve) {
	solves.update(state => [...state, solve])
}

export function initialSolves(s: Solve[]) {
	solves.update(() => s)
}

export function deleteSolves(id: number) {
	solves.update(state => state.filter(i => i.id !== id))
}

export function changeSolveStats(id: number, status: solve_status_enum) {
	solves.update(state => state.map(i => (i.id === id ? { ...i, status } : i)))
}

export function resetSolves() {
	solves.update(() => [])
}
