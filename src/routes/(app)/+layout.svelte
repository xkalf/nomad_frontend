<script lang="ts">
	import { browser } from '$app/environment'
	import { cubeType } from '$lib/stores/cubeType'
	import { session } from '$lib/stores/session'
	import { getSessionByCube, getSessionById } from '$lib/utils/api'
	import { onMount } from 'svelte'

	async function getSession() {
		if (browser) {
			const sessionId = localStorage.getItem('sessionId')

			if (!sessionId) {
				await getSessionByCube($cubeType)
				return
			}

			const id = parseFloat(sessionId || '')

			if (isNaN(id)) {
				await getSessionByCube($cubeType)
				return
			}

			await getSessionById(id)
		}
	}

	onMount(async () => {
		await getSession()
		if (!$session) {
			await getSessionByCube('333')
		}
	})
</script>

<slot />
