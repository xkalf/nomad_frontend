import type { Session } from '@prisma/client'
import { writable } from 'svelte/store'

export const session = writable<Session>()

export function setSession(s: Session) {
	session.set(s)
}
