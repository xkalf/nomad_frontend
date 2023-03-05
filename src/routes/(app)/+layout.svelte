<script lang="ts">
	import Loading from '$lib/components/Loading.svelte'
	import { setCubeType } from '$lib/stores/cubeType'
	import { loading, setLoading  } from '$lib/stores/loading'
	import { setSession } from '$lib/stores/session'
	import { initialSessions } from '$lib/stores/sessions'
	import { setSettings } from '$lib/stores/settings'
	import { initialSolves } from '$lib/stores/solves'
	import type { CubeType, Solve } from '@prisma/client'
	import { onMount } from 'svelte'
	import type { LayoutServerData } from './$types'

	export let data: LayoutServerData

	setSettings(data.settings)
	if (data.getSessions) {
		setSession(data.getSessions.session)
		initialSessions(data.getSessions.sessions)
		setCubeType(data.getSessions.session.cube as CubeType)
	}

	async function getSolves(sessionId: number) {
		const solves = (await (await fetch(`/api/solve?sessionId=${sessionId}`)).json()) as {
			success: boolean
			solves?: Solve[]
		}
		if (solves.solves) {
			initialSolves(solves.solves)
		}
	}

	onMount(async () => {
		if (data.getSessions?.session) {
			setLoading(true)
			await getSolves(data.getSessions.session.id)
			setLoading(false)
		}
	})
</script>

<Loading loading={$loading} />

<slot />
