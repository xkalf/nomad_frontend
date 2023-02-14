import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	const ok = !!locals.user

	if (!ok) {
		throw redirect(307, '/login')
	}

	return {
		user: locals.user
	}
}
