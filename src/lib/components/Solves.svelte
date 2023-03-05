<script lang="ts">
	import Icon from '@iconify/svelte'
	import Solve from './Solve.svelte'
	import { solves } from '../stores/solves'
	import { changeSortMode, sortMode } from '$lib/stores/sortMode'
	import type { Solve as SolveItem } from '@prisma/client'

	export let mobile = false

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

	$: formattedSolves =
		$sortMode === 'asc'
			? $solves.slice().sort((a, b) => compare(a, b))
			: $sortMode === 'desc'
			? $solves.slice().sort((a, b) => compare(b, a))
			: $solves.slice().reverse()
</script>

<div
	class={`${
		mobile ? 'max-h-96 min-h-[200px]' : 'mx-4 flex-grow'
	} flex flex-col overflow-y-auto rounded-xl bg-secondary`}
>
	<div
		class="flex w-full items-center justify-center rounded-t-xl bg-primary py-2 text-lg text-white"
	>
		<button class="h-5" on:click={changeSortMode}>
			{#if $sortMode === 'none'}
				<Icon icon="ri:arrow-up-down-fill" width="22" />
			{:else if $sortMode === 'asc'}
				<Icon icon="ri:arrow-up-fill" width="22" />
			{:else if $sortMode === 'desc'}
				<Icon icon="ri:arrow-down-fill" width="22" />
			{/if}
		</button>
	</div>
	<!-- Solves -->
	<ul class="scrollbar flex-grow overflow-y-auto p-4">
		{#each formattedSolves as solve, index}
			<li>
				<Solve order={$sortMode === 'none' ? formattedSolves.length - index : index + 1} {solve} />
			</li>
		{/each}
	</ul>
</div>
