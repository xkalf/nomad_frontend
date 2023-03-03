<script lang="ts">
	import Modal from '$lib/components/Modal.svelte'
	import { SolveStatus, type Solve } from '@prisma/client'
	import { onMount } from 'svelte'
	import { changeSolveStats, deleteSolves } from '../stores/solves'
	import { formatTime } from '../utils/timer-utils'

	export let order: number
	export let solve: Solve

	let deleteModalOpen = false
	let modal: HTMLDialogElement
	let selected: 'two-look' | 'cfop' = 'cfop'
	let cfop = {
		cross: '',
		f2l1: '',
		f2l2: '',
		f2l3: '',
		f2l4: '',
		oll: '',
		pll: ''
	}

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

	onMount(() => {
		// modal.showModal()
	})
</script>

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

<dialog
	bind:this={modal}
	class="w-[60vw] rounded-xl bg-[#454F57] py-4 px-4 font-sans text-white md:px-0"
>
	<div class="mx-auto w-full md:w-3/5">
		<h2 class="text-center text-2xl text-white md:text-3xl">Эвлүүлэлт №1</h2>
		<div class="flex w-full items-center justify-between p-2 text-2xl text-white">
			<span>{formatTime(solve)}</span>
			<div class="flex gap-4">
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
		<div class="mt-2">
			<p class="text-xl text-scramble">Холилт</p>
			<input
				type="text"
				value={solve.scramble}
				class="mt-2 w-full rounded-lg bg-[#2B2F32] p-2 text-scramble"
			/>
		</div>
		<div class="mt-2">
			<p class="text-xl text-scramble">Тайлбар</p>
			<input
				type="text"
				placeholder="Тайлбар бичнэ үү"
				class="mt-2 w-full rounded-lg bg-[#2B2F32] p-2 text-scramble"
			/>
		</div>
		<div>
			{#if selected === 'cfop'}
				<form action={`api/solve/${solve.id}/cfop`} method="POST">
					<div class="flex rounded-lg bg-[#2B2F32]">
						<p>cross</p>
					</div>
				</form>
			{/if}
		</div>
	</div>
</dialog>

<Modal okFunction={deleteSolve} isOpen={deleteModalOpen} cancelFunction={hideModal}>
	<p class="text-lg text-white">Уг эвлүүлэлтийг устгах уу?</p>
</Modal>
