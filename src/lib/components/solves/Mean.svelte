<script lang="ts">
	import { solves } from '$lib/stores/solves'
	import { formatTime, getAvg, getBestAverage, getMean } from '$lib/utils/timer-utils'
	import SolvesList from './SolvesList.svelte'

	export let isOpen = false
	export let isAdmin = false

	const averages = [5, 12, 25, 50, 100, 200, 300, 500, 1000] as const
</script>

<div
	class={`${isOpen ? 'block' : 'hidden'} ${
		isAdmin ? '' : 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
	} z-20 w-5/6 max-w-6xl rounded-xl bg-white p-4 font-sans text-primary md:px-0 xl:w-auto`}
>
	<div class="mx-auto w-full md:w-3/5">
		<h2 class="text-2xl text-center md:text-3xl">Дундаж {getMean($solves)}</h2>
		<div class="overflow-y-auto max-h-64">
			{#each averages.filter(i => i <= $solves.length) as average}
				<div class="mx-auto mt-2 md:mt-6">
					<div
						class="flex items-center w-full text-lg text-center text-white rounded-xl bg-secondary"
					>
						<div class="p-4 w-2/5 rounded-xl md:w-1/5 bg-primary">Ao{average}</div>
						<div class="w-2/5 text-center">
							{getAvg($solves, average)}
						</div>
						<div class="w-2/5 text-center text-green-400">
							{getAvg(getBestAverage($solves, average), average)}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	{#if !isAdmin}
		<SolvesList solves={$solves} />
		<div class="flex justify-center mt-2">
			<button
				class="py-2 px-4 text-xl text-white rounded-xl bg-primary"
				on:click={() => (isOpen = false)}>Close</button
			>
		</div>
	{/if}
</div>
