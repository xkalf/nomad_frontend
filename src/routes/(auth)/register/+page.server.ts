import db from '$lib/db'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { AuthApiError } from '@supabase/supabase-js'
import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'

const registerSchema = z.object({
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
	email: z.string().email({ message: 'Буруу мэйл хаяг байна.' }),
	phone: z
		.string()
		.refine(value => value.length === 8 || value.length === 12, {
			message: 'Утасны дугаар буруу байна.'
		})
		.transform(value => (value.length === 12 ? value.slice(4) : value)),
	birthdate: z.string().transform(i => new Date(i)),
	gender: z.enum(['Male', 'Female'])
})

export const load: PageServerLoad = async event => {
	if (event.locals.user) {
		throw redirect(303, '/')
	}

	const form = await superValidate(event, registerSchema)
	return {
		form
	}
}

export const actions: Actions = {
	register: async event => {
		const { locals } = event
		const body = await superValidate(event, registerSchema)

		if (!body.valid) {
			return fail(400, {
				form: body
			})
		}

		const { error } = await locals.sb.auth.signUp({
			email: body.data.email,
			password: body.data.password
		})

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'И-мэйл хаяг эсвэл нууц үг буруу байна.'
				})
			}

			return fail(500, {
				error: 'Сервер алдаа гарлаа.'
			})
		}

		const { password: _, ...rest } = body.data

		await db.user.create({
			data: {
				...rest,
				birthdate: new Date(rest.birthdate)
			}
		})

		throw redirect(303, '/')
	}
}
