/* eslint-disable @typescript-eslint/no-unused-vars */
import db from '$lib/db'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { z } from 'zod'
import { setError, superValidate } from 'sveltekit-superforms/server'

const registerSchema = z
	.object({
		firstname: z
			.string()
			.min(2, { message: 'Нэр 2-оос дээш урттай байх ёстой.' })
			.trim()
			.transform(i => i.toLocaleLowerCase()),
		lastname: z
			.string()
			.min(2, { message: 'Овог 2-оос дээш урттай байх ёстой.' })
			.trim()
			.transform(i => i.toLocaleLowerCase()),
		password: z.string().min(8, { message: 'Нууц үг 8-аас дээш урттай байна.' }),
		passwordRe: z.string(),
		email: z
			.string()
			.email({ message: 'Буруу и-мэйл хаяг байна.' })
			.transform(i => i.toLocaleLowerCase()),
		phone: z
			.string()
			.refine(value => value.length === 8 || value.length === 12, {
				message: 'Утасны дугаар буруу байна.'
			})
			.transform(value => (value.length === 12 ? value.slice(4) : value)),
		birthdate: z.string().transform(i => new Date(i)),
		gender: z.enum(['Male', 'Female'])
	})
	.refine(value => value.password === value.passwordRe, {
		message: 'Нууц үг хоорондоо таарахгүй байна.'
	})

export const load: PageServerLoad = async event => {
	const form = await superValidate(event, registerSchema)
	return {
		form
	}
}

export const actions: Actions = {
	register: async event => {
		const { locals, url } = event
		const body = await superValidate(event, registerSchema)

		if (!body.valid) {
			return fail(400, {
				form: body
			})
		}

		const { error } = await locals.supabase.auth.signUp({
			email: body.data.email,
			password: body.data.password,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`
			}
		})

		if (error) {
			if (error.status === 400) {
				return setError(body, '', 'И-мэйл хаяг эсвэл нууц үг буруу байна.')
			}

			console.error(error)
			return setError(body, '', 'Сервер алдаа гарлаа.')
		}

		const { password, passwordRe, ...rest } = body.data

		await db.user.create({
			data: {
				...rest
			}
		})

		throw redirect(303, '/')
	}
}
