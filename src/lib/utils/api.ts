import { browser } from '$app/environment'
import { setCubeType } from '$lib/stores/cubeType'
import { setSession } from '$lib/stores/session'
import { initialSessions } from '$lib/stores/sessions'
import { initialSolves } from '$lib/stores/solves'
import type { Session, Solve } from '@prisma/client'
import type { CubeType } from './enum-adapter'

export async function getSessionByCube(type: CubeType): Promise<void> {
	const result = (await (await fetch(`/api/session?cube=${type}&main=true`)).json()) as {
		sessions: Session[]
	}

	initialSessions(result.sessions)

	const id = result.sessions.find(i => i.main === true)?.id

	const currentSession = (await (await fetch(`/api/session/${id}`)).json()) as {
		session: Session & { solves: Solve[] }
	}

	setSession(currentSession.session)
	initialSolves(currentSession.session.solves)
	if (browser) localStorage.setItem('sessionId', id?.toString() || '')
}

export async function getSessionById(id: number): Promise<void> {
	const currentSession = (await (await fetch(`/api/session/${id}`)).json()) as {
		session: Session & { solves: Solve[] }
	}

	if (!currentSession.session) {
		return
	}

	setSession(currentSession.session)
	initialSolves(currentSession.session.solves)
	setCubeType(currentSession.session.cube as CubeType)

	const result = (await (
		await fetch(`/api/session?cube=${currentSession.session.cube}`)
	).json()) as {
		sessions: Session[]
	}

	if (browser) {
		localStorage.setItem('sessionId', currentSession.session.id.toString())
	}

	initialSessions(result.sessions)
}
