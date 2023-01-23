import type { User } from '$lib/types'
import { writable } from 'svelte/store'

export const user = writable<User>({
	firstname: '',
	lastname: '',
	birthdate: '',
	id: -1
})

export function setUser(u: User) {
	user.set(u)
}
