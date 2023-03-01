import { writable } from 'svelte/store'

export const loading = writable(true)

export const setLoading = (i: boolean) => {
	loading.set(i)
}
