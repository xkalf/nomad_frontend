<script lang="ts">
	import { formatTime } from '$lib/utils/timer-utils'
	import type { Solve } from '@prisma/client'

	export let solves: Solve[] = []
</script>

<h3 class="mt-8 text-3xl text-center">Эвлүүлэлтийн жагсаалт</h3>
<div class="overflow-y-auto pr-4 mx-4 mt-2 max-h-40 text-2xl md:mx-8 md:max-h-72 lg:mx-12">
	{#each solves as solve, index}
		<div class="flex gap-2 py-2 md:gap-4">
			<span>{index + 1}.</span>
			<span>{formatTime(solve)}</span>
			<span class="overflow-hidden whitespace-nowrap text-ellipsis">{solve.scramble}</span>
		</div>
	{/each}
</div>
