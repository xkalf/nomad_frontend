<script lang="ts">
	import { setCubeType } from '$lib/stores/cubeType'
	import { setSession } from '$lib/stores/session'
	import { initialSessions } from '$lib/stores/sessions'
	import { setSettings } from '$lib/stores/settings'
	import { initialSolves } from '$lib/stores/solves'
	import type { CubeType } from '$lib/utils/types'
	import type { LayoutServerData } from './$types'

	export let data: LayoutServerData

	setSettings(data.settings)
	if (data.getSessions) {
		setSession(data.getSessions.session)
		initialSessions(data.getSessions.sessions)
		initialSolves(data.getSessions.session.solves)
		setCubeType(data.getSessions.session.cube as CubeType)
	}
</script>

<slot />
