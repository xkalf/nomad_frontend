<script lang="ts">
	import '../app.css'
	import logo from '$lib/assets/vertical-logo.png'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'

	$: {
		if (typeof gtag !== 'undefined') {
			gtag('config', 'G-5BDWRZD9W5', {
				page_title: document.title,
				page_path: $page.url.href
			})
		}
	}

	function setViewHeight() {
		if (browser) {
			let vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		}
	}

	onMount(() => {
		setViewHeight()

		window.addEventListener('resize', () => {
			setViewHeight()
		})
	})
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-5BDWRZD9W5">
	</script>
	<script>
		window.dataLayer = window.dataLayer || []

		function gtag() {
			dataLayer.push(arguments)
		}

		gtag('js', new Date())
		gtag('config', 'G-5BDWRZD9W5')
	</script>
	<meta name="keywords" content="rubik, cube, timer, nomad, team, 3x3" />
	<meta name="og:image" content={logo} />
	<meta name="og:title" content="Нүүдэлчин рубик шооны клуб" />
	<meta name="og:type" content="website" />
	<title>Нүүдэлчин клуб</title>
</svelte:head>

<slot />
