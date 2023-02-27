<script lang="ts">
	import Icon from '@iconify/svelte'
	import Solve from './Solve.svelte'
	import { solves } from '../stores/solves'
	import { changeSortMode, sortMode } from '$lib/stores/sortModa'

	export let mobile = false

	$: formattedSolves =
		$sortMode === 'asc'
			? $solves.slice().sort((a, b) => a.time - b.time)
			: $sortMode === 'desc'
			? $solves.slice().sort((a, b) => b.time - a.time)
			: $solves.slice().reverse()
</script>

<div
	class={`${
		mobile ? 'max-h-96 min-h-[200px] bg-mobileAverage' : 'mx-4 flex-grow bg-sidebarElement'
	} flex flex-col overflow-y-auto rounded-xl`}
>
	<div
		class="flex w-full items-center justify-center rounded-t-xl bg-[#3E4449] py-2 text-lg text-white"
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
