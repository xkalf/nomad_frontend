<script lang="ts">
	import Modal from '$lib/components/Modal.svelte'
	import { SolveStatus, type Solve } from '@prisma/client'
	import { changeSolveStats, deleteSolves } from '../stores/solves'
	import { formatTime } from '../utils/timer-utils'

	export let order: number
	export let solve: Solve

	let deleteModalOpen = false

	async function deleteSolve() {
		const response = await fetch(`/api/solve/${solve.id}`, {
			method: 'DELETE'
		})
		const data = await response.json()

		if (data.success === true) {
			deleteSolves(solve.id)
			hideModal()
		}
	}

	function hideModal() {
		deleteModalOpen = false
	}

	async function updateSolve(status: SolveStatus) {
		let st: SolveStatus

		if (status !== SolveStatus.Ok && solve.status !== SolveStatus.Ok && status !== solve.status) {
			return
		}

		if (solve.status === status) {
			st = SolveStatus.Ok
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

<Modal okFunction={deleteSolve} isOpen={deleteModalOpen} cancelFunction={hideModal}>
	<p class="text-lg text-white">Уг эвлүүлэлтийг устгах уу?</p>
</Modal>

<div class="flex justify-between p-2 text-white">
	<span>{order}. {formatTime(solve)}</span>
	<div class="flex gap-1">
		<button
			class="text-red-500"
			on:click={e => {
				updateSolve(SolveStatus.Plus2)
				e.currentTarget.blur()
			}}>+2</button
		>
		<button
			class="text-white"
			on:click={e => {
				updateSolve(SolveStatus.Dnf)
				e.currentTarget.blur()
			}}>DNF</button
		>
		<button
			class="text-red-500"
			on:click={() => {
				deleteModalOpen = true
			}}
		>
			X
		</button>
	</div>
</div>
