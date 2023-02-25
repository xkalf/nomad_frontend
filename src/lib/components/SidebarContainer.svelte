<script lang="ts">
	import { page } from '$app/stores'
	import Icon from '@iconify/svelte'
</script>

<div class="hidden max-h-screen flex-col overflow-hidden bg-sidebarBg p-6 md:flex">
	<div class="flex justify-between py-4 text-white">
		<p class="lowercase">{$page.data.user.email}</p>
		<form action="/logout" method="POST">
			<button type="submit">Гарах</button>
		</form>
	</div>
	<div class="flex justify-between">
		<div class={`flex h-14 w-14 items-center justify-center rounded-lg bg-[#5f6469]`}>
			<a href="/">
				<Icon icon="iconoir:rubik-cube" width="35" color="#A3A7AB" />
			</a>
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5f6469]">
			<Icon icon="ri:pie-chart-2-fill" width="35" color="#A3A7AB" />
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5f6469]">
			<Icon icon="material-symbols:person" width="35" color="#A3A7AB" />
		</div>
		<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5f6469]">
			<a href="/settings/display">
				<Icon icon="uiw:setting" width="35" color="#A3A7AB" />
			</a>
		</div>
	</div>
	<slot />
</div>
