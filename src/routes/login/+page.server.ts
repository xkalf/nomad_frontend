import db from '$lib/db'
import { fail, type Actions, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	const ok = locals.user ? true : false
	if (ok) {
		throw redirect(302, '/')
	}
}

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as {
			email: string
			password: string
		}

		try {
			const user = await db.user.findUnique({
				where: {
					email
				}
			})

			if (!user) {
				return fail(401, { message: 'Хэрэглэгч олдсонгүй.' })
			}

			const ok = await bcrypt.compare(password, user.password)

			if (!ok) {
				return fail(400)
			}

			const authUser = await db.user.update({
				where: { email },
				data: { token: crypto.randomUUID() }
			})

			cookies.set('session', authUser.token || '', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30
			})

			throw redirect(302, '/')
		} catch (err) {
			console.log(err)
			return fail(500, { message: 'Нууц үг буруу байна.' })
		}
	}
}
