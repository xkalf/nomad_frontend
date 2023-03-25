import type { Settings } from '@prisma/client'
import { writable } from 'svelte/store'

export const settings = writable<Settings>()

export const setSettings = (s: Settings) => {
	settings.set(s)
}
