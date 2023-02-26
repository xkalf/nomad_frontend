<script lang="ts">
	import { browser } from '$app/environment'
	import { cubeType } from '$lib/stores/cubeType'
	import { session } from '$lib/stores/session'
	import { setSettings } from '$lib/stores/settings'
	import { getSessionByCube, getSessionById } from '$lib/utils/api'
	import type { MySettings } from '$lib/utils/types'
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
		const settings = (await (await fetch('/api/settings')).json()) as { settings: MySettings }
		setSettings(settings.settings)
		await getSession()

		if (!$session) {
			await getSessionByCube('333')
		}
	})
</script>

<slot />
