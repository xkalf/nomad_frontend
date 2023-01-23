<script lang="ts">
	import '../app.css'
	import 'scramble-display'
	import axios from 'axios'
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
  import { setUser } from '$lib/stores/user'
  import type { User } from '$lib/types'

	axios.defaults.baseURL = 'https://nomad-backend.onrender.com'

	async function getProfile() {
		try {
			const response = await axios.get<User>('/users')

			setUser(response.data)
		} catch (e: any) {
			if (e.response.status === 401) {
				goto('/login')
			}
		}
	}

	if (browser) {
		const token = localStorage.getItem('access_token')

		if (!token) {
			goto('/login')
		}

		axios.defaults.headers.common['Authorization'] = token || ''
	}

	onMount(async () => {
		await getProfile()
	})
</script>

<slot />
