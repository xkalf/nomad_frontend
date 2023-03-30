<script lang="ts">
	import MobileNavbar from './MobileNavbar.svelte'
</script>

<div class="relative flex h-screen flex-col bg-background">
	<slot />
	<MobileNavbar />
</div>
