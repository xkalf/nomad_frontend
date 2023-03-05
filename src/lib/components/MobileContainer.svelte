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

<div class="bg-background relative flex h-screen flex-col">
	<slot />
	<div class="mt-auto flex h-20 items-center justify-around bg-primary p-4">
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
