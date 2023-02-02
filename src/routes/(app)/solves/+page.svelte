<script lang="ts">
	import Average from '$lib/Average.svelte'
	import MobileContainer from '$lib/MobileContainer.svelte'
	import Solves from '$lib/Solves.svelte'
	import { solves } from '$lib/stores/solves'
	import { displayTime, getAvg, getBest } from '$lib/utils/timer-utils'

	const averages: { label: string; value: string }[] = [
		{
			label: 'Best',
			value: getBest($solves)
		},
		{
			label: 'Mean',
			value: getBest($solves)
		},
		{
			label: 'Ao5 Best',
			value: $solves.length >= 5 ? getAvg($solves.splice(-5)) : displayTime(0)
		},
		{
			label: 'Ao5',
			value: $solves.length >= 12 ? getAvg($solves.splice(-12)) : displayTime(0)
		},
		{
			label: 'Ao12 Best',
			value: $solves.length >= 25 ? getAvg($solves.splice(-25)) : displayTime(0)
		},
		{
			label: 'Ao12',
			value: $solves.length >= 50 ? getAvg($solves.splice(-50)) : displayTime(0)
		},
		{
			label: 'Ao50',
			value: $solves.length >= 100 ? getAvg($solves.splice(-100)) : displayTime(0)
		},
		{
			label: 'Ao100',
			value: $solves.length >= 200 ? getAvg($solves.splice(-200)) : displayTime(0)
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
