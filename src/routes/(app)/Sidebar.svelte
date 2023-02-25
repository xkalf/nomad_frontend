<script lang="ts">
	import Average from '../../lib/components/Average.svelte'
	import { solves } from '../../lib/stores/solves'
	import type { CubeType } from '../../lib/utils/types'
	import { getAvg, getBest } from '../../lib/utils/timer-utils'
	import Solves from '$lib/components/Solves.svelte'
	import Sessions from '$lib/components/Sessions.svelte'
	import SidebarContainer from '$lib/components/SidebarContainer.svelte'

	export let changeCubeType: (type: CubeType) => Promise<void>
</script>

<SidebarContainer>
	<div class="mt-4 flex flex-col justify-center gap-4 border-t border-[#797878] p-4">
		<Average label="Best" value={getBest($solves)} best={true} />
		<div class="flex gap-2">
			<Average label="Ao5" value={getAvg($solves, 5)} />
			<Average label="Ao12" value={getAvg($solves, 12)} />
		</div>
		<div class="average flex gap-2">
			<Average label="Ao50" value={getAvg($solves, 50)} />
			<Average label="Ao100" value={getAvg($solves, 100)} />
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
