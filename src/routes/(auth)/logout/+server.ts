import { error, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals }) => {
	const { error: err } = await locals.sb.auth.signOut()

	if (err) {
		throw error(500, 'Сервер алдаа гарлаа.')
	}

	throw redirect(303, '/login')
}
