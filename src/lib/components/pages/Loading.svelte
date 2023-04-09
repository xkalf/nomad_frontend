<script lang="ts">
	import arrow from '$lib/assets/arrow.webp'
	import loadingLogo from '$lib/assets/loading-logo.webp'

	export let loading = false
	export let fix = false
</script>

<div
	class={`absolute top-0 left-0 z-40 h-screen w-full backdrop-blur-sm ${
		loading ? 'block' : 'hidden'
	}`}
>
	<div
		class={`absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 overflow-hidden md:h-96 md:w-96`}
	>
		<img
			class="absolute top-1/2 left-1/2 z-10 w-40 -translate-x-1/2 -translate-y-1/2 md:w-64"
			src={loadingLogo}
			alt="loading-logo"
		/>
		<img class={`z-0 animate-rotate`} src={arrow} alt="arrow" />
	</div>
</div>

{#if fix}
	<h1
		class="absolute right-1/2 top-1/2 z-50 w-full translate-y-60 translate-x-1/2 text-4xl text-black"
	>
		Сервэрт засвар хийж байна
	</h1>
{/if}
