import db from '$lib/db'
import { fail, redirect } from '@sveltejs/kit'
import type { Gender, Prisma } from '@prisma/client'
import type { Actions, PageServerLoad } from './$types'
import { AuthApiError } from '@supabase/supabase-js'

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/')
	}
}

export const actions: Actions = {
	// default: async ({ request, locals }) => {
	// 	if (!locals.session) {
	// 		throw redirect(303, '/login')
	// 	}
	//
	// 	const formData = Object.fromEntries(await request.formData()) as any
	//
	// 	await db.user.create({
	// 		data: {
	// 			...formData,
	// 			birthdate: new Date(formData.birthdate),
	// 			gender: formData.gender as Gender,
	// 			authId: locals.session.user.id
	// 		}
	// 	})
	//
	// 	throw redirect(303, '/')
	// },
	register: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData()) as Prisma.UserCreateInput & {
			password: string
		}

		const { error } = await locals.sb.auth.signUp({
			email: body.email as string,
			password: body.password as string
		})

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'invalid email or password'
				})
			}

			return fail(500, {
				error: 'Server error'
			})
		}

		const { password, ...rest } = body

		await db.user.create({
			data: {
				...rest,
				birthdate: new Date(rest.birthdate)
			}
		})

		throw redirect(303, '/')
	}
}
