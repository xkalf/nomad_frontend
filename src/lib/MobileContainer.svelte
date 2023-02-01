<script lang="ts">
	import Icon from '@iconify/svelte'
</script>

<div class="mobile-page flex h-screen flex-col">
	<slot />
	<div class="mt-auto flex items-center justify-around bg-[#040404] p-4">
		<a href="/">
			<Icon icon="game-icons:house" width="30" color="#A3A7AB" />
		</a>
		<a data-sveltekit-preload-data href="/solves">
			<Icon icon="ri:pie-chart-2-fill" width="30" color="#A3A7AB" />
		</a>
		<Icon icon="material-symbols:person" width="30" color="#A3A7AB" />
		<Icon icon="uiw:setting" width="30" color="#A3A7AB" />
	</div>
</div>
