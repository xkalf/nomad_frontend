import { browser } from '$app/environment'
import { setCubeType } from '$lib/stores/cubeType'
import { setSession } from '$lib/stores/session'
import { initialSessions } from '$lib/stores/sessions'
import { initialSolves } from '$lib/stores/solves'
import type { CubeType } from '@prisma/client'
import type { SessionWithSolves, SessionWithSolvesCount } from './types'

export async function getSessionByCube(type: CubeType): Promise<void> {
	const result = (await (await fetch(`/api/session?cube=${type}&main=true`)).json()) as {
		sessions: SessionWithSolvesCount[]
	}

	initialSessions(result.sessions)

	const id = result.sessions.find(i => i.main === true)?.id

	const currentSession = (await (await fetch(`/api/session/${id}`)).json()) as {
		session: SessionWithSolves
	}

	setSession(currentSession.session)
	initialSolves(currentSession.session.solves)
	if (browser) {
		localStorage.setItem(type, id?.toString() || '')
		localStorage.setItem('sessionId', currentSession.session.id.toString())
	}
}

export async function getSessionById(id: number): Promise<void> {
	const currentSession = (await (await fetch(`/api/session/${id}`)).json()) as {
		session: SessionWithSolves
	}

	if (!currentSession.session) {
		return getSessionByCube('N3')
	}

	setSession(currentSession.session)
	initialSolves(currentSession.session.solves)
	setCubeType(currentSession.session.cube as CubeType)

	const result = (await (
		await fetch(`/api/session?cube=${currentSession.session.cube}`)
	).json()) as {
		sessions: SessionWithSolvesCount[]
	}

	if (browser) {
		localStorage.setItem('sessionId', currentSession.session.id.toString())
		localStorage.setItem(currentSession.session.cube, currentSession.session.id.toString())
	}

	initialSessions(result.sessions)
}
