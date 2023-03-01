import { writable } from 'svelte/store'

export const loading = writable({
	layout: true,
	page: false
})

export const setLayoutLoading = (l: boolean) => {
	loading.update(i => ({ ...i, layout: l }))
}

export const setPageLoading = (l: boolean) => {
	loading.update(i => ({ ...i, page: l }))
}
