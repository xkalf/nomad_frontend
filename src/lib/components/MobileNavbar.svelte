<script lang="ts">
	import HomeIcon from '$lib/icons/HomeIcon.svelte'
	import ProfileIcon from '$lib/icons/ProfileIcon.svelte'
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte'
	import SolvesIcon from '$lib/icons/SolvesIcon.svelte'
	import StatsIcon from '$lib/icons/StatsIcon.svelte'
	import { solves } from '$lib/stores/solves'
	import { page } from '$app/stores'

	function getIconColor(route: string) {
		return route === $page.route.id
	}
</script>

<div class="mt-auto flex h-20 items-center justify-around bg-primary p-4 md:hidden">
	<a data-sveltekit-preload-data href="/">
		<HomeIcon open={getIconColor('/(app)')} />
	</a>
	<a data-sveltekit-preload-data href="/solves">
		<SolvesIcon open={getIconColor('/(app)/solves')} count={$solves.length} />
	</a>
	<StatsIcon />
	<ProfileIcon />
	<a data-sveltekit-preload-data href="/settings">
		<SettingsIcon open={getIconColor('/(app)/settings')} />
	</a>
</div>
