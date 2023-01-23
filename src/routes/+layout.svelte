<script lang="ts">
	import '../app.css'
	import 'scramble-display'
	import axios from 'axios'
	import { browser } from '$app/environment'

	axios.defaults.baseURL = 'http://localhost:4000'

	if (browser) {
		const token = localStorage.getItem('access_token')

		if(!token) {
			window.location.href = "/login"
		}

		axios.defaults.headers.common['Authorization'] = localStorage.access_token || ''
	}
</script>

<slot />
