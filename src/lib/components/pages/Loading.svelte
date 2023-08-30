<script lang="ts">
	import arrow from '$lib/assets/arrow.webp'
	import loadingLogo from '$lib/assets/loading-logo.webp'

	export let loading = false
	export let fix = false
</script>

{#if loading}
	<div class="absolute top-0 left-0 z-40 w-full h-screen backdrop-blur-sm">
		<div
			class="overflow-hidden absolute top-1/2 left-1/2 w-60 h-60 -translate-x-1/2 -translate-y-1/2 md:w-96 md:h-96"
		>
			<img
				class="absolute top-1/2 left-1/2 z-10 w-40 -translate-x-1/2 -translate-y-1/2 md:w-64"
				src={loadingLogo}
				alt="loading-logo"
			/>
			<img class={`z-0 animate-rotate`} src={arrow} alt="arrow" />
		</div>
	</div>
{/if}

{#if fix}
	<h1
		class="absolute top-1/2 right-1/2 z-50 w-full text-4xl text-black translate-x-1/2 translate-y-60"
	>
		Сервэрт засвар хийж байна
	</h1>
{/if}
