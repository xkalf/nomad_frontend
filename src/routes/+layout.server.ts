import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	const ok = locals.user ? true : false
	if (!ok) {
		throw redirect(302, '/login')
	}

	return {
		user: locals.user
	}
}
