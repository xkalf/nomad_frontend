<script lang="ts">
	import Average from '$lib/components/Average.svelte'
	import MobileContainer from '$lib/components/MobileContainer.svelte'
	import Sessions from '$lib/components/Sessions.svelte'
	import Solves from '$lib/components/Solves.svelte'
	import { solves } from '$lib/stores/solves'
	import { getBest, getBestAverage, getMean } from '$lib/utils/timer-utils'
	import type { CubeType, Solve } from '@prisma/client'

	let averages: { label: string; value?: string; solves?: Solve[]; count?: number }[]

	$: $solves, console.log(getBestAverage($solves, 5))

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
				solves: getBestAverage($solves, 5),
				count: 5
			},
			{
				label: 'Ao5',
				solves: $solves.slice(-5),
				count: 5
			},
			{
				label: 'Ao12 Best',
				solves: getBestAverage($solves, 12),
				count: 12
			},
			{
				label: 'Ao12',
				solves: $solves.slice(-12),
				count: 12
			},
			{
				label: 'Ao50',
				solves: $solves.slice(-50),
				count: 50
			},
			{
				label: 'Ao100',
				solves: $solves.slice(-100),
				count: 100
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
				<Average
					best
					mobile
					label={average.label}
					value={average.value}
					count={average.count}
					solves={average.solves}
				/>
			{/each}
		</div>
		<h2 class="mt-2 text-2xl text-white">Solves</h2>
		<Solves mobile />
		<Sessions mobile {changeCubeType} />
	</div>
</MobileContainer>
