<script lang="ts">
	import type { SolveStatus, Solve } from '@prisma/client'
	import { changeSolveStats } from '../../stores/solves'
	import { formatTime } from '../../utils/timer-utils'

	export let order: number
	export let solve: Solve
	export let showDate = false
	export let openDeleteModal: () => void
	export let openShowModal: () => void

	function formatDate(curr: Date) {
		const date = new Date(curr)
		return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
			.getDate()
			.toString()
			.padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date
			.getMinutes()
			.toString()
			.padStart(2, '0')}.${date.getSeconds().toString().padStart(2, '0')}`
	}

	async function updateSolve(status: SolveStatus) {
		let st: SolveStatus

		if (status !== 'Ok' && solve.status !== 'Ok' && status !== solve.status) {
			return
		}

		if (solve.status === status) {
			st = 'Ok'
		} else {
			st = status
		}

		const response = await fetch(`/api/solve/${solve.id}`, {
			method: 'PUT',
			body: JSON.stringify({ status: st })
		})
		const data = await response.json()

		if (data.success === true) {
			changeSolveStats(data.solve)
		}
	}
</script>

<div class="flex justify-between p-2 text-white">
	<button on:click={openShowModal}
		>{order}. {formatTime(solve)}
		{#if showDate}
			({formatDate(solve.createdAt)})
		{/if}</button
	>
	<div class="flex gap-1">
		<button
			class="text-red-500"
			on:click={e => {
				updateSolve('Plus2')
				e.currentTarget.blur()
			}}>+2</button
		>
		<button
			class="text-white"
			on:click={e => {
				updateSolve('Dnf')
				e.currentTarget.blur()
			}}>DNF</button
		>
		<button
			class="text-red-500"
			on:click={() => {
				openDeleteModal()
			}}
		>
			&#10005;
		</button>
	</div>
</div>
