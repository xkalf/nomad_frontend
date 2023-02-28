<script lang="ts">
	import arrow from '$lib/assets/arrow.webp'
	import loadingLogo from '$lib/assets/loading-logo.webp'
</script>

<div class="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
	<img
		class="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
		width="250"
		src={loadingLogo}
		alt="loading-logo"
	/>
	<img class="z-0 animate-spin-slow" src={arrow} alt="arrow" />
</div>
