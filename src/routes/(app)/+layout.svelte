<script lang="ts">
	import Loading from '$lib/components/pages/Loading.svelte'
	import { setCubeType } from '$lib/stores/cubeType'
	import { setSession } from '$lib/stores/session'
	import { initialSessions } from '$lib/stores/sessions'
	import { setSettings } from '$lib/stores/settings'
	import { initialSolves } from '$lib/stores/solves'
	import type { LayoutServerData } from './$types'

	export let data: LayoutServerData

	let loading = false

	setSettings(data.settings)
	if (data.getSessions) {
		setSession(data.getSessions.session)
		initialSolves(data.getSessions.session.solves)
		setCubeType(data.getSessions.session.cube)
		initialSessions(data.getSessions.sessions)
	}
</script>

<Loading {loading} />

<slot />
