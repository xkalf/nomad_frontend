import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const ok = locals.user ? true : false

	if (!ok) {
		throw redirect(302, '/login')
	}

	return {
		user: locals.user
	}
}
