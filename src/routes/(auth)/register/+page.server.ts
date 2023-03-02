import type { Actions } from './$types'
import z from 'zod'
import db from '$lib/db'
import { fail, redirect } from '@sveltejs/kit'
import { hash } from 'bcrypt'
import { AuthApiError } from '@supabase/supabase-js'

const registerSchema = z.object({
	email: z
		.string()
		.email()
		.trim()
		.transform(i => i.toLocaleLowerCase()),
	password: z.string().min(8, { message: 'Нууц үг 8 тэмдэгтээс багагүй урттай байх ёстой.' }),
	firstname: z
		.string()
		.min(2, { message: 'Нэр 2 тэмдэгтээс багагүй урттай байх ёстой.' })
		.trim()
		.transform(i => i.toLocaleLowerCase()),
	lastname: z
		.string()
		.min(2, { message: 'Овог 2 тэмдэгтээс багагүй урттай байх ёстой.' })
		.trim()
		.transform(i => i.toLocaleLowerCase()),
	birthdate: z.string().transform(i => new Date(i))
})

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData())
		const result = registerSchema.safeParse(formData)

		if (!result.success) {
			const errors = result.error.errors.map(error => ({
				field: error.path[0],
				message: error.message
			}))

			return fail(400, { errors, data: formData })
		}

		const { data, error: err } = await locals.sb.auth.signUp({
			email: result.data.email,
			password: result.data.password
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Бүртгүүлэхэд алдаа гарлаа.'
				})
			}

			return fail(500, {
				error: 'Cервер алдаа гарлаа.'
			})
		}

		throw redirect(303, '/')

		// const user = await db.user.findUnique({ where: { email: result.data.email } })

		// if (user) {
		// 	return fail(400, { error: 'Бүртгэлтэй хэрэглэгч байна.' })
		// }

		// await db.user.create({
		// 	data: {
		// 		...result.data,
		// 		password: await hash(result.data.password, 10)
		// 	}
		// })

		// throw redirect(303, '/login')
	}
}
