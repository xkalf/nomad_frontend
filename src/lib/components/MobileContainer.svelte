<script lang="ts">
	import { page } from '$app/stores'
	import HomeIcon from '$lib/icons/HomeIcon.svelte'
	import ProfileIcon from '$lib/icons/ProfileIcon.svelte'
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte'
	import SolvesIcon from '$lib/icons/SolvesIcon.svelte'
	import StatsIcon from '$lib/icons/StatsIcon.svelte'
	import { solves } from '$lib/stores/solves'

	function getIconColor(route: string) {
		return route === $page.route.id
	}
</script>

<div class="mobile-page relative flex h-screen flex-col">
	<slot />
	<div class="mt-auto flex items-center justify-around bg-[#040404] p-4">
		<a data-sveltekit-preload-data href="/">
			<HomeIcon open={getIconColor('/(app)')} />
		</a>
		<a data-sveltekit-preload-data href="/solves">
			<SolvesIcon open={getIconColor('/(app)/solves')} count={$solves.length} />
		</a>
		<StatsIcon />
		<ProfileIcon />
		<SettingsIcon />
	</div>
</div>
