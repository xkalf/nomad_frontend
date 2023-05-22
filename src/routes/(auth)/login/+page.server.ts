import { AuthApiError, type Provider } from '@supabase/supabase-js'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { z } from 'zod'
import { setError, superValidate } from 'sveltekit-superforms/server'

const loginSchema = z.object({
	email: z
		.string()
		.email({ message: 'Буруу и-мэйл хаяг байна.' })
		.transform(value => value.trim().toLocaleLowerCase()),
	password: z.string()
})

export const load: PageServerLoad = async event => {
	const { locals } = event
	if (locals.session) {
		if (!locals.user) {
			throw redirect(303, '/register')
		}
		throw redirect(303, '/')
	}

	const form = await superValidate(event, loginSchema)

	return {
		form
	}
}

export const actions: Actions = {
	oAuth: async ({ locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider
		const redirectUrl = url.origin

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
	},
	login: async event => {
		const { url, locals } = event

		const formData = await superValidate(event, loginSchema)

		if (!formData.valid) {
			return {
				form: formData
			}
		}

		const recovery = url.searchParams.get('recovery') as string

		if (recovery) {
			const { error } = await locals.sb.auth.resetPasswordForEmail(formData.data.email)

			if (error) {
				return setError(formData, 'password', 'Нууц үг сэргээхэд алдаа гарлаа.')
			}

			throw redirect(307, '/')
		}

		const { error: err } = await locals.sb.auth.signInWithPassword({
			email: formData.data.email,
			password: formData.data.password
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return setError(formData, 'password', 'Хэрэглэгчийн и-мэйл хаяг эсвэл нууц үг буруу байна.')
			}

			return setError(formData, 'password', 'Сервер алдаа гарлаа.')
		}

		throw redirect(307, '/')
	}
}
