<script lang="ts">
	import arrow from '$lib/assets/arrow.webp'
	import loadingLogo from '$lib/assets/loading-logo.webp'

	export let loading = false
</script>

<div
	class={`absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 overflow-hidden md:h-96 md:w-96 ${
		loading ? 'block' : 'hidden'
	}`}
>
	<img
		class="absolute top-1/2 left-1/2 z-10 w-40 -translate-x-1/2 -translate-y-1/2 md:w-64"
		src={loadingLogo}
		alt="loading-logo"
	/>
	<img class={`z-0 animate-rotate`} src={arrow} alt="arrow" />
</div>
