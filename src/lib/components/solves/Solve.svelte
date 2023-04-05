<script lang="ts">
	import type { SolveStatus, Solve } from '@prisma/client'
	import { changeSolveStats } from '../../stores/solves'
	import { formatTime } from '../../utils/timer-utils'

	export let order: number
	export let solve: Solve
	export let openDeleteModal: () => void
	export let openShowModal: () => void

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
	<button on:click={openShowModal}>{order}. {formatTime(solve)}</button>
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
