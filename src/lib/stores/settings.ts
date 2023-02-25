import type { MySettings } from '$lib/utils/types'
import { writable } from 'svelte/store'

export const settings = writable<MySettings>()

export const setSettings = (s: MySettings) => {
	settings.set(s)
}
