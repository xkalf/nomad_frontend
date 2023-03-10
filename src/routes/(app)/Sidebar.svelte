<script lang="ts">
	import Average from '../../lib/components/Average.svelte'
	import { solves } from '../../lib/stores/solves'
	import { getBest } from '../../lib/utils/timer-utils'
	import Solves from '$lib/components/Solves.svelte'
	import Sessions from '$lib/components/Sessions.svelte'
	import SidebarContainer from '$lib/components/SidebarContainer.svelte'
	import type { CubeType } from '@prisma/client'
	import { bestSolve } from '$lib/stores/bestSolve'

	export let changeCubeType: (type: CubeType) => Promise<void>
</script>

<SidebarContainer>
	<div class="mt-4 flex flex-col justify-center gap-4 p-4">
		<Average label="Best" value={getBest($bestSolve)} best />
		<div class="flex gap-2">
			<Average label="Ao5" solves={$solves.slice(-5)} count={5} />
			<Average label="Ao12" solves={$solves.slice(-12)} count={12} />
		</div>
		<div class="average flex gap-2">
			<Average label="Ao50" solves={$solves.slice(-50)} count={50} />
			<Average label="Ao100" solves={$solves.slice(-100)} count={100} />
		</div>
	</div>
	<Solves />
	<Sessions {changeCubeType} />
</SidebarContainer>

<style>
	@media screen and (max-height: 800px) {
		.average {
			display: none;
		}
	}
</style>
