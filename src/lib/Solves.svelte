<script lang="ts">
	import Icon from '@iconify/svelte'
	import Solve from './Solve.svelte'
	import { solves } from './stores/solves'

	export let mobile: boolean = false

	let sortMode: 'asc' | 'desc' | 'none' = 'none'

	$: formattedSolves =
		sortMode === 'asc'
			? $solves.slice().sort((a, b) => a.time - b.time)
			: sortMode === 'desc'
			? $solves.slice().sort((a, b) => b.time - a.time)
			: $solves.slice().reverse()

	function changeSortMode() {
		switch (sortMode) {
			case 'none':
				sortMode = 'asc'
				break
			case 'asc':
				sortMode = 'desc'
				break
			case 'desc':
				sortMode = 'none'
				break
		}
	}
</script>

<div
	class={`${
		mobile ? 'max-h-96 bg-mobileAverage' : 'mx-4 flex-grow bg-sidebarElement'
	} flex flex-col overflow-y-auto rounded-xl`}
>
	<div
		class="flex w-full items-center justify-around rounded-t-xl bg-[#3E4449] py-2 text-lg text-white"
	>
		<button on:click={changeSortMode}>
			{#if sortMode === 'none'}
				1-9
			{:else if sortMode === 'asc'}
				9-1
			{:else if sortMode === 'desc'}
				Эцсийн
			{/if}
		</button>
		<Icon icon="ri:arrow-up-down-fill" width="22" />
		<button class="text-[#565D63]">B-W</button>
	</div>
	<!-- Solves -->
	<ul class="scrollbar flex-grow overflow-y-auto p-4">
		{#each formattedSolves as solve, index}
			<li>
				<Solve order={sortMode === 'none' ? formattedSolves.length - index : index + 1} {solve} />
			</li>
		{/each}
	</ul>
</div>
