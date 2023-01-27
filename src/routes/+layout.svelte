<script lang="ts">
	import '../app.css'
	import logo from '$lib/assets/timer-black.png'
</script>

<svelte:head>
	<meta name="og:image" content={logo} />
	<meta name="og:title" content="Нүүдэлчин рубик шооны клуб" />
	<meta name="og:type" content="website" />
	<title>Нүүдэлчин клуб</title>
</svelte:head>

<slot />
