<script lang="ts">
	import Loading from '$lib/components/pages/Loading.svelte'
	import { setCubeType } from '$lib/stores/cubeType'
	import { setSession } from '$lib/stores/session'
	import { initialSessions } from '$lib/stores/sessions'
	import { setSettings } from '$lib/stores/settings'
	import { initialSolves } from '$lib/stores/solves'
	import type { Solve } from '@prisma/client'
	import type { LayoutServerData } from './$types'
	import { createQuery } from '@tanstack/svelte-query'

	export let data: LayoutServerData

	let loading = true

	const query = createQuery({
		queryKey: ['solves'],
		queryFn: async () => {
			const res = await fetch(`/api/solve?sessionId=${data.getSessions?.session.id}`)
			const solves = (await res.json()) as {
				success: boolean
				solves: Solve[]
			}
			return solves
		},
		onSuccess: data => {
			console.log(data)
			initialSolves(data.solves)
			loading = false
		},
		enabled: !!data.getSessions?.session
	})

	console.log($query.status)

	setSettings(data.settings)
	if (data.getSessions) {
		setSession(data.getSessions.session)
		setCubeType(data.getSessions.session.cube)
		initialSessions(data.getSessions.sessions)
	}
</script>

<Loading {loading} />

<slot />
