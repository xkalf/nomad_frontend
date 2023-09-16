import type { Provider } from '@supabase/supabase-js'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { z } from 'zod'
import { setError, superValidate, setMessage } from 'sveltekit-superforms/server'

const loginSchema = z.object({
	email: z
		.string()
		.min(1)
		.email({ message: 'Буруу и-мэйл хаяг байна.' })
		.transform(value => value.toLocaleLowerCase()),
	password: z.string().min(1, { message: 'Нууц үг оруулна уу.' })
})

export const load: PageServerLoad = async event => {
	const form = await superValidate(event, loginSchema)

	if (event.locals.user) {
		throw redirect(303, '/')
	}

	return {
		form
	}
}

export const actions: Actions = {
	oAuth: async ({ locals, url }) => {
		const provider = url.searchParams.get('provider') as Provider

		if (provider) {
			const { data, error: err } = await locals.supabase.auth.signInWithOAuth({
				provider,
				options: {
					...(provider === 'google' && {
						queryParams: {
							access_type: 'offline',
							prompt: 'consent'
						}
					}),
					redirectTo: `${url.origin}/auth/callback`
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
		const { locals } = event

		const formData = await superValidate(event, loginSchema)

		if (!formData.valid) {
			return {
				form: formData
			}
		}

		const { error: err } = await locals.supabase.auth.signInWithPassword({
			email: formData.data.email,
			password: formData.data.password
		})

		if (err) {
			if (err.message === 'Email not confirmed') {
				return setError(formData, 'password', 'И-мэйл хаягаа шалгана уу.')
			}

			if (err.status === 400) {
				return setError(formData, '', 'Хэрэглэгчийн и-мэйл хаяг эсвэл нууц үг буруу байна.')
			}

			console.error(err.message)
			return setError(formData, '', 'Сервер алдаа гарлаа.')
		}

		throw redirect(303, '/')
	},
	recovery: async event => {
		const { locals, url } = event

		const form = await superValidate(event, loginSchema)

		if (form.errors.email) {
			return {
				form
			}
		}

		const { error } = await locals.supabase.auth.resetPasswordForEmail(form.data.email, {
			redirectTo: url.origin
		})

		if (error) {
			if (error.status === 429) {
				return setError(form, 'password', 'Нууц үг сэргээх и-мэйлийг илгээсэн байна.')
			}
			return setError(form, 'password', 'Нууц үг сэргээхэд алдаа гарлаа.')
		}

		return setMessage(form, 'Нууц үг сэргээх и-мэйлийг илгээлээ.')
	}
}
