<script lang="ts">
	import Average from '$lib/components/Average.svelte'
	import MobileContainer from '$lib/components/MobileContainer.svelte'
	import Sessions from '$lib/components/Sessions.svelte'
	import Solves from '$lib/components/Solves.svelte'
	import { solves } from '$lib/stores/solves'
	import type { CubeType } from '$lib/utils/types'
	import { getAvg, getBest, getBestAverage, getMean } from '$lib/utils/timer-utils'

	let averages: { label: string; value: string }[]

	$: $solves,
		(averages = [
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
		])

	async function changeCubeType(type: CubeType): Promise<void> {}
</script>

<svelte:head>
	<title>Эвлүүлэлтүүд</title>
</svelte:head>

<MobileContainer>
	<div class="flex flex-col gap-2 overflow-y-auto p-4">
		<h2 class="text-2xl text-white">Stats</h2>
		<div class="grid grid-cols-2 gap-4">
			{#each averages as average}
				<Average best mobile label={average.label} value={average.value} />
			{/each}
		</div>
		<h2 class="mt-2 text-2xl text-white">Solves</h2>
		<Solves mobile />
		<Sessions mobile {changeCubeType} />
	</div>
</MobileContainer>
