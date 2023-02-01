import type { Actions } from './$types'
import z from 'zod'
import db from '$lib/db'
import { fail, redirect } from '@sveltejs/kit'
import { hash } from 'bcrypt'

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
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData())
		const result = registerSchema.safeParse(formData)

		if (!result.success) {
			const errors = result.error.errors.map(error => ({
				field: error.path[0],
				message: error.message
			}))

			return fail(400, { errors, data: formData })
		}

		const user = await db.user.findUnique({ where: { email: result.data.email } })

		if (user) {
			return fail(400, { error: 'Бүртгэлтэй хэрэглэгч байна.' })
		}

		await db.user.create({
			data: {
				...result.data,
				password: await hash(result.data.password, 10)
			}
		})

		throw redirect(303, '/login')
	}
}
