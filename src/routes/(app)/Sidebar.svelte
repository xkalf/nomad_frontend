<script lang="ts">
	import { page } from '$app/stores'
	import Icon from '@iconify/svelte'
	import Average from '../../lib/components/Average.svelte'
	import { solves } from '../../lib/stores/solves'
	import type { CubeType } from '../../lib/utils/types'
	import { getAvg, getBest } from '../../lib/utils/timer-utils'
	import Solves from '$lib/components/Solves.svelte'
	import Sessions from '$lib/components/Sessions.svelte'

	export let changeCubeType: (type: CubeType) => Promise<void>
</script>

<div class="flex max-h-screen flex-col overflow-hidden bg-sidebarBg p-6">
	<div class="flex justify-between py-4 text-white">
		<p class="lowercase">{$page.data.user.email}</p>
		<form action="/logout" method="POST">
			<button type="submit">Гарах</button>
		</form>
	</div>
	<div class="flex justify-between">
		<div class={`flex h-14 w-14 items-center justify-center rounded-lg bg-[#5f6469]`}>
			<Icon icon="iconoir:rubik-cube" width="35" color="#A3A7AB" />
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5f6469]">
			<Icon icon="ri:pie-chart-2-fill" width="35" color="#A3A7AB" />
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5f6469]">
			<Icon icon="material-symbols:person" width="35" color="#A3A7AB" />
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5f6469]">
			<Icon icon="uiw:setting" width="35" color="#A3A7AB" />
		</div>
	</div>
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
</div>

<style>
	@media screen and (max-height: 800px) {
		.average {
			display: none;
		}
	}
</style>
