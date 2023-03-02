import { AuthApiError, type Provider } from '@supabase/supabase-js'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const ok = locals.user ? true : false
	if (ok) {
		throw redirect(302, '/')
	}
}

export const actions: Actions = {
	login: async ({ request, locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider

		if (provider) {
			const { data, error: err } = await locals.sb.auth.signInWithOAuth({
				provider
			})

			if (err) {
				console.log(err)
				return fail(400, {
					error: 'Алдаа гарлаа.'
				})
			}

			throw redirect(303, data.url)
		}

		const formData = Object.fromEntries(await request.formData()) as {
			email: string
		}

		const { email } = formData

		const { error: err } = await locals.sb.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo:
					process.env.NODE_ENV === 'production' ? 'https://nomad-team.com' : 'http://localhost:5173'
			}
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Хэрэглэгчийн и-мэйл хаяг эсвэл нууц үг буруу байна.'
				})
			}

			return fail(500, {
				error: 'Сервер алдаа гарлаа.'
			})
		}

		throw redirect(303, '/')
	}
}
