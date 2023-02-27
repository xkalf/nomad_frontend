<script lang="ts">
	import { cubeType } from '$lib/stores/cubeType'
	import 'scramble-display'

	export let scramble: string | null
	export let mobile = false
</script>

<scramble-display
	style="width: 100%;"
	{scramble}
	event={$cubeType}
	visualization={mobile ? '2D' : $cubeType === 'pyram' ? '2D' : '3D'}
/>
