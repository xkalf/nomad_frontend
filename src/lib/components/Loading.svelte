<script lang="ts">
	import arrow from '$lib/assets/arrow.png'
	import loadingLogo from '$lib/assets/loading-logo.png'
</script>

<div class="h-screen">
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
		<div class="relative h-96 w-96">
			<div class="grid h-full w-full grid-cols-3 grid-rows-3 items-center justify-center">
				<img class="col-start-2 -rotate-90" src={arrow} alt="arrow" />
				<img class="col-start-1 row-start-2 rotate-180" src={arrow} alt="arrow" />
				<img class="col-start-2 row-start-2" src={loadingLogo} alt="logo" />
				<img class="col-start-3 row-start-2" src={arrow} alt="arrow" />
				<img class="col-start-2 row-start-3 rotate-90" src={arrow} alt="arrow" />
			</div>
		</div>
	</div>
</div>
