import { AuthApiError, type Provider } from '@supabase/supabase-js'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { NODE_ENV } from '$env/static/private'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) {
		if (!locals.user) {
			throw redirect(303, '/register')
		}
		throw redirect(303, '/')
	}
}

export const actions: Actions = {
	login: async ({ request, locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider
		const redirectUrl = NODE_ENV === 'production' ? 'https://nomad-team.com' : url.origin

		if (provider) {
			const { data, error: err } = await locals.sb.auth.signInWithOAuth({
				provider,
				options: {
					redirectTo: redirectUrl
				}
			})

			if (err) {
				return fail(400, {
					error: 'Алдаа гарлаа.'
				})
			}

			throw redirect(303, data.url)
		}

		const formData = Object.fromEntries(await request.formData()) as {
			email: string
			password: string
		}

		const recovery = url.searchParams.get('recovery') as string

		const email = formData.email.trim().toLocaleLowerCase()

		if (recovery) {
			const { error } = await locals.sb.auth.resetPasswordForEmail(email)

			if (error) {
				return fail(400, {
					error: 'Нууц үг сэргээхэд алдаа гарлаа.'
				})
			}

			return {
				success: true
			}
		}

		const { error: err } = await locals.sb.auth.signInWithPassword({
			email,
			password: formData.password
		})

		if (err) {
			if (err instanceof AuthApiError) {
				if (err.status === 400) {
					return fail(400, {
						error: 'Хэрэглэгчийн и-мэйл хаяг эсвэл нууц үг буруу байна.'
					})
				} else if (err.status === 429) {
					return fail(400, {
						error: 'Нэвтрэх линкийг и-мэйл хаяг руу илгээсэн байна.'
					})
				}
			}

			return fail(500, {
				error: 'Сервер алдаа гарлаа.'
			})
		}

		return {
			success: true
		}
	}
}
