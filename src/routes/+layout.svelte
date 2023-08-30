<script lang="ts">
	import '../app.css'
	import logo from '$lib/assets/vertical-logo.png'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import { invalidate } from '$app/navigation'
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
	import { browser } from '$app/environment'
	import type { LayoutData } from './$types'

	export let data: LayoutData

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	})

	$: {
		if (typeof gtag !== 'undefined') {
			// eslint-disable-next-line no-undef
			gtag('config', 'G-5BDWRZD9W5', {
				page_title: document.title,
				page_path: $page.url.href
			})
		}
	}

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, _session) => {
			console.log(_session)
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => {
			subscription.unsubscribe()
		}
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
</svelte:head>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
