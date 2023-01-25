<script lang="ts">
	import { solve_status_enum, type Solve } from '@prisma/client'
	import axios from 'axios'
	import { changeSolveStats, deleteSolves } from './stores/solves'
	import { displayTime } from './utils/timer-utils'

	export let order: number
	export let solve: Solve

	async function deleteSolve() {
		const response = await fetch(`/api/solve/${solve.id}`, {
			method: 'DELETE'
		})
		const data = await response.json()

		if (data.success === true) deleteSolves(solve.id)
	}

	async function updateSolve(status: solve_status_enum) {
		let st: solve_status_enum

		if (solve.status === status) {
			st = solve_status_enum.ok
		} else {
			st = status
			if (status !== solve_status_enum.ok && solve.status !== solve_status_enum.ok) {
				return
			}
		}

		const response = await fetch(`/api/solve/${solve.id}`, {
			method: 'PUT',
			body: JSON.stringify({ status: st })
		})
		const data = await response.json()

		if (data.success === true) changeSolveStats(solve.id, st)
	}
</script>

<div class="flex justify-between text-white p-2">
	{#if solve.status === solve_status_enum.ok}
		<span>{order}. {displayTime(solve.time)}</span>
	{:else if solve.status === solve_status_enum.dnf}
		<span>{order}. (DNF)</span>
	{:else if solve.status === solve_status_enum.plus2}
		<span>{order}. +{displayTime(solve.time + 2000)}</span>
	{/if}
	<div class="flex gap-1">
		<button class="text-red-500" on:click={() => updateSolve(solve_status_enum.plus2)}>+2</button>
		<button class="text-white" on:click={() => updateSolve(solve_status_enum.dnf)}>DNF</button>
		<button class="text-red-500" on:click={deleteSolve}> X </button>
	</div>
</div>
