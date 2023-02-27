import { writable } from 'svelte/store'

const sortModeMapper: Record<sortModeType, sortModeType> = {
	none: 'asc',
	asc: 'desc',
	desc: 'none'
}

export type sortModeType = 'asc' | 'desc' | 'none'

export const sortMode = writable<'asc' | 'desc' | 'none'>('none')

export const changeSortMode = () => {
	sortMode.update(curr => sortModeMapper[curr])
}
