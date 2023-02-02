<script lang="ts">
	import Average from '$lib/Average.svelte'
	import MobileContainer from '$lib/MobileContainer.svelte'
	import Solves from '$lib/Solves.svelte'
	import { solves } from '$lib/stores/solves'
	import { displayTime, getAvg, getBest, getBestAverage, getMean } from '$lib/utils/timer-utils'

	const averages: { label: string; value: string }[] = [
		{
			label: 'Best',
			value: getBest($solves)
		},
		{
			label: 'Mean',
			value: getMean($solves)
		},
		{
			label: 'Ao5 Best',
			value: getBestAverage($solves, 5)
		},
		{
			label: 'Ao5',
			value: getAvg($solves, 5)
		},
		{
			label: 'Ao12 Best',
			value: getBestAverage($solves, 12)
		},
		{
			label: 'Ao12',
			value: getAvg($solves, 12)
		},
		{
			label: 'Ao50',
			value: getAvg($solves, 50)
		},
		{
			label: 'Ao100',
			value: getAvg($solves, 100)
		}
	]
</script>

<MobileContainer>
	<div class="flex flex-grow flex-col gap-2 overflow-y-auto p-4">
		<h2 class="text-2xl text-white">Stats</h2>
		<div class="grid grid-cols-2 gap-4">
			{#each averages as average}
				<Average best mobile label={average.label} value={average.value} />
			{/each}
		</div>
		<h2 class="mt-2 text-2xl text-white">Solves</h2>
		<Solves mobile />
	</div>
</MobileContainer>
