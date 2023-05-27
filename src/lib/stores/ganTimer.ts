import { writable } from 'svelte/store'
import type { GanTimerConnection } from 'gan-web-bluetooth'

export const ganTimer = writable<GanTimerConnection>()
