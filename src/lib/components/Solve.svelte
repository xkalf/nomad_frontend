<script lang="ts">
	import Modal from '$lib/components/Modal.svelte'
	import type { SolveWithDetail } from '$lib/utils/types'
	import { SolveStatus, type Solve } from '@prisma/client'
	import { changeSolveStats, deleteSolves } from '../stores/solves'
	import { formatTime } from '../utils/timer-utils'
	import CfopSolve from './CfopSolve.svelte'
	import TwoLookSolve from './TwoLookSolve.svelte'
	import type { CfopSolve as CfopType, TwoLookSolve as TwoLookType } from '@prisma/client'

	export let order: number
	export let solve: Solve

	let deleteModalOpen = false
	let modal: HTMLDialogElement
	const options = [
		{
			label: 'CFOP',
			component: CfopSolve
		},
		{
			label: 'Two Look',
			component: TwoLookSolve
		}
	]
	let selected = options[0]

	let cfopData: CfopType | null = null
	let twoLookData: TwoLookType | null = null

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

	async function openModal() {
		selected = options[0]
		modal.showModal()
		const data = (await (await fetch(`/api/solve/${solve.id}`)).json()) as SolveWithDetail | null
		if (data) {
			cfopData = data.cfopSolve
			twoLookData = data.twoLookSolve
		}
	}
</script>

<div class="flex justify-between p-2 text-white">
	<button on:click={openModal}>{order}. {formatTime(solve)}</button>
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
		<h2 class="text-center text-2xl text-white md:text-3xl">Эвлүүлэлт №{order}</h2>
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
			<p class="mt-4 text-xl text-scramble">Эвлүүлэлт үүсгэх</p>
			<div class="mt-2 flex gap-4">
				{#each options as option}
					<button
						class="text-base"
						on:click={() => {
							selected = option
						}}>{option.label}</button
					>
				{/each}
			</div>
			<svelte:component
				this={selected.component}
				solveId={solve.id}
				{cfopData}
				{twoLookData}
				closeFunction={() => {
					modal.close()
				}}
			/>
		</div>
	</div>
</dialog>

<Modal okFunction={deleteSolve} isOpen={deleteModalOpen} cancelFunction={hideModal}>
	<p class="text-lg text-white">Уг эвлүүлэлтийг устгах уу?</p>
</Modal>
