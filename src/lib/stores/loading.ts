import { writable } from 'svelte/store'

export const loading = writable(false)

export const setLoading = (l: boolean) => {
	loading.set(l)
}
