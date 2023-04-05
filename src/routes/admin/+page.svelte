<script lang="ts">
	import { CubeType, type Session, type Solve, type User } from '@prisma/client'
	import type { LayoutServerData } from './$types'
	import { cubeTypeMapper } from '$lib/utils/types'
	import { displayTime } from '$lib/utils/timer-utils'
	import { browser } from '$app/environment'

	type UserWithSessions = User & { sessions: Session[] }

	export let data: LayoutServerData

	let selected: {
		user: UserWithSessions | undefined
		cube: CubeType
		session: Session | undefined
	} = {
		user: data.users[0],
		cube: 'N3',
		session: data.users[0].sessions[0]
	}
	let solves: Solve[] = []
	let sessions: Session[] = []

	async function getSolves() {
		if (!selected.session || !browser) return
		const data = await (await fetch(`/api/session/${selected.session.id}?admin=true`)).json()
		console.log(data)
		solves = data.session.solves
	}

	$: selected.cube, (sessions = selected.user?.sessions.filter(i => i.cube === selected.cube) || [])
	$: selected.session, getSolves()
</script>

<div class="font-xl flex gap-4">
	<select bind:value={selected.user}>
		{#each data.users as user}
			<option value={user}>{user.firstname}</option>
		{/each}
	</select>

	<select bind:value={selected.cube}>
		{#each Object.values(CubeType) as cube}
			<option value={cube}>{cubeTypeMapper[cube]}</option>
		{/each}
	</select>

	<select bind:value={selected.session}>
		{#if selected.user}
			{#each sessions as session}
				<option value={session}>{session.name}</option>
			{/each}
		{/if}
	</select>
</div>
<div class="relative">
	<table>
		<thead>
			<th>ID</th>
			<th>Scramble</th>
			<th>Time</th>
			<th>Status</th>
		</thead>
		<tbody>
			{#each solves as solve}
				<tr>
					<td>{solve.id}</td>
					<td>{solve.scramble}</td>
					<td>{displayTime(solve.time)}</td>
					<td>{solve.status}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	select {
		@apply mb-2 block border py-2 px-4 text-sm font-medium text-gray-900;
	}

	table {
		@apply w-full text-left text-sm text-gray-500;
	}

	th,
	td {
		@apply px-6 py-3;
	}
</style>
