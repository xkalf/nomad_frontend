<script lang="ts">
	import SidebarContainer from '$lib/components/SidebarContainer.svelte'
</script>

<svelte:head>Тохиргоо</svelte:head>

<div class="h-screen md:grid md:grid-cols-[minmax(350px,_1fr)_4fr]">
	<SidebarContainer />
	<div class="h-full bg-mainBg p-14">
		<slot />
	</div>
</div>
