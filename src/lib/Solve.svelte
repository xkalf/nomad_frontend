<script lang="ts">
	import axios from 'axios'
	import { changeSolveStats, deleteSolves } from './stores/solves'
	import { SolveStatus, type Solve } from './types'
	import { displayTime } from './utils/timer-utils'

	export let order: number
	export let solve: Solve

	async function deleteSolve() {
		const response = await axios.delete(`solves/${solve.id}`)

		if (response.status === 200) deleteSolves(solve.id)
	}

	async function updateSolve(status: SolveStatus) {
		let st: SolveStatus

		if (solve.status === status) {
			st = SolveStatus.Ok
		} else {
			st = status
			if (status !== SolveStatus.Ok && solve.status !== SolveStatus.Ok) {
				return
			}
		}

		const response = await axios.patch(`solves/${solve.id}`, {
			status: st
		})

		if (response.status === 200) changeSolveStats(solve.id, st)
	}
</script>

<div class="flex justify-between text-white p-2">
	{#if solve.status === SolveStatus.Ok}
		<span>{order}. {displayTime(solve.time)}</span>
	{:else if solve.status === SolveStatus.Dnf}
		<span>{order}. (DNF)</span>
	{:else if solve.status === SolveStatus.Plus2}
		<span>{order}. +{displayTime(solve.time + 2000)}</span>
	{/if}
	<div class="flex gap-1">
		<button class="text-red-500" on:click={() => updateSolve(SolveStatus.Plus2)}>+2</button>
		<button class="text-white" on:click={() => updateSolve(SolveStatus.Dnf)}>DNF</button>
		<button class="text-red-500" on:click={deleteSolve}>
			X
		</button>
	</div>
</div>
