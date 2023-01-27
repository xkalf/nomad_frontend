<script lang="ts">
	import type { Solve } from '@prisma/client'
	import { changeSolveStats, deleteSolves } from '../../lib/stores/solves'
	import type { SolveStatus } from '../../lib/utils/enum-adapter'
	import { displayTime } from '../../lib/utils/timer-utils'

	export let order: number
	export let solve: Solve

	async function deleteSolve() {
		const response = await fetch(`/api/solve/${solve.id}`, {
			method: 'DELETE'
		})
		const data = await response.json()

		if (data.success === true) deleteSolves(solve.id)
	}

	async function updateSolve(status: SolveStatus) {
		let st: SolveStatus

		if (status !== 'ok' && solve.status !== 'ok' && status !== solve.status) {
			return
		}

		if (solve.status === status) {
			st = 'ok'
		} else {
			st = status
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
	{#if solve.status === 'ok'}
		<span>{order}. {displayTime(solve.time)}</span>
	{:else if solve.status === 'dnf'}
		<span>{order}. (DNF)</span>
	{:else if solve.status === '+2'}
		<span>{order}. +{displayTime(solve.time + 2000)}</span>
	{/if}
	<div class="flex gap-1">
		<button class="text-red-500" on:click={() => updateSolve('+2')}>+2</button>
		<button class="text-white" on:click={() => updateSolve('dnf')}>DNF</button>
		<button class="text-red-500" on:click={deleteSolve}> X </button>
	</div>
</div>
