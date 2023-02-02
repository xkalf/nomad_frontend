import type { Session } from '@prisma/client'
import { writable } from 'svelte/store'

export const sessions = writable<Session[]>([])

export function addSession(session: Session) {
	sessions.update(i => [...i, session])
}

export function deleteSession(id: number) {
	sessions.update(i => i.filter(j => j.id !== id))
}

export function initialSessions(s: Session[]) {
	sessions.set(s)
}
