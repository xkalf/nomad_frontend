import { error, redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals }) => {
	const { error: err } = await locals.supabase.auth.signOut()

	if (err) {
		error(500, 'Сервер алдаа гарлаа.');
	}

	redirect(303, '/auth/login');
}
