<script lang="ts">
	import Icon from '@iconify/svelte'
	import Solve from './Solve.svelte'
	import { changeSolveStats, deleteSolves, solves } from '../../stores/solves'
	import { changeSortMode, sortMode } from '$lib/stores/sortMode'
	import type { Solve as SolveItem, SolveStatus } from '@prisma/client'
	import { formatTime, getMean } from '$lib/utils/timer-utils'
	import Modal from '../Modal.svelte'
	import { bestSolve } from '$lib/stores/bestSolve'
	import Mean from './Mean.svelte'

	export let mobile = false

	let deleteModalOpen = false
	let selected: SolveItem | undefined = undefined
	let showModal: HTMLDialogElement
	let isMeanOpen = false

	async function deleteSolve() {
		if (!selected) return

		const response = await fetch(`/api/solve/${selected.id}`, {
			method: 'DELETE'
		})
		const data = await response.json()

		if (data.success === true) {
			deleteSolves(selected.id)
			deleteModalOpen = false
		}
	}

	function compare(a: SolveItem, b: SolveItem) {
		if (a.status === 'Ok' && b.status === 'Ok') {
			return a.time - b.time
		}

		if (a.status === 'Dnf' && b.status === 'Dnf') {
			return 0
		}

		if (a.status === 'Dnf') {
			return 1
		}

		if (b.status === 'Dnf') {
			return -1
		}

		let timeA = a.time
		let timeB = b.time

		if (a.status === 'Plus2') {
			timeA += 2000
		}

		if (b.status === 'Plus2') {
			timeB += 2000
		}

		return timeA - timeB
	}

	async function updateSolve(status: SolveStatus) {
		if (!selected) return
		let st: SolveStatus

		if (status !== 'Ok' && selected.status !== 'Ok' && status !== selected.status) {
			return
		}

		if (selected.status === status) {
			st = 'Ok'
		} else {
			st = status
		}

		const response = await fetch(`/api/solve/${selected.id}`, {
			method: 'PUT',
			body: JSON.stringify({ status: st })
		})
		const data = await response.json()

		if (data.success === true) {
			changeSolveStats(data.solve)
		}
	}

	$: formattedSolves =
		$sortMode === 'asc'
			? $solves.slice().sort((a, b) => compare(a, b))
			: $sortMode === 'desc'
			? $solves.slice().sort((a, b) => compare(b, a))
			: $solves.slice().reverse()

	bestSolve.subscribe(async i => {
		if (i.open) {
			selected = i
			showModal.showModal()
		}
	})
</script>

<div
	class={`${
		mobile ? 'max-h-96 min-h-[200px]' : 'mx-4 flex-grow'
	} flex flex-col overflow-y-auto rounded-xl bg-secondary`}
>
	<div class="grid grid-cols-3 items-center py-2 w-full text-lg text-white rounded-t-xl bg-primary">
		<div class="flex items-center">
			<button
				class="h-5 translate-x-4"
				on:click={e => {
					e.currentTarget.blur()
					changeSortMode()
				}}
			>
				{#if $sortMode === 'none'}
					<Icon icon="ri:arrow-up-down-fill" width="22" />
				{:else if $sortMode === 'asc'}
					<Icon icon="ri:arrow-up-fill" width="22" />
				{:else if $sortMode === 'desc'}
					<Icon icon="ri:arrow-down-fill" width="22" />
				{/if}
			</button>
		</div>
		<div class="flex col-span-2 justify-start">
			<button on:click={() => (isMeanOpen = true)}>Mean {getMean($solves)}</button>
		</div>
	</div>
	<!-- Solves -->
	<ul class="overflow-y-auto flex-grow p-4 mr-2 scrollbar">
		{#each formattedSolves as solve, index}
			<li>
				<Solve
					openDeleteModal={() => {
						selected = solve
						deleteModalOpen = true
					}}
					openShowModal={() => {
						selected = solve
						showModal.showModal()
					}}
					order={$sortMode === 'none' ? formattedSolves.length - index : index + 1}
					{solve}
				/>
			</li>
		{/each}
	</ul>
</div>

<Modal okFunction={deleteSolve} bind:isOpen={deleteModalOpen}>
	<p class="text-lg text-primary">Уг эвлүүлэлтийг устгах уу?</p>
</Modal>

<Mean bind:isOpen={isMeanOpen} />

{#if selected}
	<dialog
		bind:this={showModal}
		class="p-4 w-full font-sans rounded-xl md:px-0 md:w-3/5 bg-background text-primary"
	>
		<div class="mx-auto w-full md:w-3/5">
			<h2 class="text-2xl text-center md:text-3xl">
				Эвлүүлэлт №{$sortMode === 'none'
					? formattedSolves.length - formattedSolves.findIndex(i => i === selected)
					: formattedSolves.findIndex(i => i === selected) + 1}
			</h2>
			<div class="flex justify-between items-center p-2 w-full text-2xl text-primary">
				<span>{formatTime(selected)}</span>
				<div class="flex gap-4">
					<button
						class="text-red-500"
						on:click={e => {
							updateSolve('Plus2')
							e.currentTarget.blur()
						}}>+2</button
					>
					<button
						class="text-primary"
						on:click={e => {
							updateSolve('Dnf')
							e.currentTarget.blur()
						}}>DNF</button
					>
					<button
						class="text-red-500"
						on:click={e => {
							e.currentTarget.blur()
							showModal.close()
							deleteModalOpen = true
						}}>&#10005;</button
					>
				</div>
			</div>
			<div class="flex flex-col gap-2 pt-2">
				<div class="mt-2">
					<p class="text-xl">Холилт</p>
					<input
						type="text"
						value={selected.scramble}
						disabled
						class="p-2 mt-2 w-full rounded-lg border border-primary"
					/>
				</div>
				<div class="mt-2">
					<p class="text-xl">Тайлбар</p>
					<input
						type="text"
						placeholder="Тайлбар бичнэ үү"
						class="p-2 mt-2 w-full rounded-lg border border-primary"
					/>
				</div>
				<form method="dialog" class="flex gap-12 justify-center items-center pt-4">
					<button
						value="cancel"
						formmethod="dialog"
						class="py-2 px-4 text-xl text-white rounded-xl bg-primary">Цуцлах</button
					>
					<button class="py-2 px-4 text-xl text-white rounded-xl bg-primary">Хадгалах</button>
				</form>
			</div>
		</div>
	</dialog>
{/if}
