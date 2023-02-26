import type { SessionWithSolvesCount } from '$lib/utils/types'
import type { Session } from '@prisma/client'
import { writable } from 'svelte/store'

export const sessions = writable<SessionWithSolvesCount[]>([])

export function addSession(session: Session) {
	sessions.update(i => [...i, { ...session, _count: { solves: 0 } }])
}

export function deleteSession(id: number) {
	sessions.update(i => i.filter(j => j.id !== id))
}

export function initialSessions(s: SessionWithSolvesCount[]) {
	sessions.set(s)
}
