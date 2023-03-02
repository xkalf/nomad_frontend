import { AuthApiError, type Provider } from '@supabase/supabase-js'
import { fail, redirect } from '@sveltejs/kit'
import { z } from 'zod'
import type { Actions, PageServerLoad } from './$types'

const loginSchema = z.object({
	email: z
		.string({ required_error: 'И-мэйл хаяг оруулна уу.' })
		.email({ message: 'И-мэйл хаяг буруу байна.' })
		.trim()
		.transform(i => i.toLocaleLowerCase())
})

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

		const formData = Object.fromEntries(await request.formData())

		const resullt = loginSchema.safeParse(formData)

		if (!resullt.success) {
			const errors = resullt.error.errors.map(i => ({
				field: i.path[0],
				message: i.message
			}))

			return fail(400, { errors, data: formData })
		}

		const { email } = resullt.data

		const { error: err } = await locals.sb.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: 'https://nomad-team.com'
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
