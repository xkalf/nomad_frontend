<script lang="ts">
	import { page } from '$app/stores'
	import HomeIcon from '$lib/icons/HomeIcon.svelte'
	import ProfileIcon from '$lib/icons/ProfileIcon.svelte'
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte'
	import StatsIcon from '$lib/icons/StatsIcon.svelte'

	function getIconColor(route: string) {
		return route === $page.route.id
	}
</script>

<div class="hidden max-h-screen flex-col overflow-hidden bg-sidebar p-6 md:flex">
	<div class="flex justify-between py-4 text-primary">
		<p class="lowercase">{$page.data.user.email}</p>
		<form action="/auth/logout" method="POST">
			<button type="submit">Гарах</button>
		</form>
	</div>
	<div class="flex justify-between px-2">
		<div class="flex h-14 w-14 items-center justify-center rounded-lg">
			<a href="/">
				<HomeIcon open={getIconColor('/(app)')} isPrimary />
			</a>
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg">
			<StatsIcon isPrimary />
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg">
			<ProfileIcon isPrimary />
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg">
			<a href="/settings">
				<SettingsIcon open={getIconColor('/(app)/settings')} isPrimary />
			</a>
		</div>
	</div>
	<slot />
</div>
