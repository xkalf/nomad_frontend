<script lang="ts">
	import { cubeType } from '$lib/stores/cubeType'

	export let scramble: string | null
</script>

<scramble-display
	style="width: 100%;"
	{scramble}
	event={$cubeType}
	visualization={$cubeType === 'pyram' ? '2D' : '3D'}
/>
