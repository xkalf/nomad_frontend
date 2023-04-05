<script lang="ts">
	import { formatTime, getAvg, getBestAverage, getMean } from '$lib/utils/timer-utils'
	import type { Solve } from '@prisma/client'

	export let solves: Solve[]
	export let isOpen: boolean = false
	export let isAdmin = false

	const averages = [5, 12, 25, 50, 100, 200, 300, 500, 1000]
</script>

<div
	class={`${
		isOpen ? 'block' : 'hidden'
	} absolute top-1/2 left-1/2 z-10 w-3/4 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white py-4 px-4 font-sans text-primary md:w-auto md:px-0`}
>
	<div class="mx-auto w-full md:w-3/5">
		<h2 class="text-center text-2xl md:text-3xl">Дундаж {getMean(solves)}</h2>
		{#each averages.filter(i => i <= solves.length) as average}
			<div class="mx-auto mt-6">
				<div
					class="flex w-full items-center rounded-xl bg-secondary text-center text-lg text-white"
				>
					<div class="w-2/5 rounded-xl bg-primary p-4 md:w-1/5">Ao{average}</div>
					<div class="w-2/5 text-center">
						{getAvg(solves, average)}
					</div>
					<div class="w-2/5 text-center text-green-400">
						{getAvg(getBestAverage(solves, average), average)}
					</div>
				</div>
			</div>
		{/each}
	</div>
	<h3 class="mt-8 text-center text-3xl">Эвлүүлэлтийн жагсаалт</h3>
	<div class="mx-8 mt-2 max-h-40 overflow-y-auto pr-4 text-2xl md:max-h-72">
		{#each solves as solve, index}
			<div class="flex gap-4 py-2">
				<span>{index + 1}.</span>
				<span>{formatTime(solve)}</span>
				<span class="overflow-hidden text-ellipsis whitespace-nowrap">{solve.scramble}</span>
			</div>
		{/each}
	</div>
	<div class={`mt-2 flex justify-center gap-4 ${isAdmin ? 'hidden' : 'block'}`}>
		<button
			class="rounded-xl bg-primary py-2 px-4 text-xl text-white"
			on:click={() => (isOpen = false)}>Close</button
		>
	</div>
</div>
