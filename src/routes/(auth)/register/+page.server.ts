import db from '$lib/db'
import { redirect } from '@sveltejs/kit'
import type { Gender } from '@prisma/client'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, '/login')
	}

	if (locals.user) {
		throw redirect(303, '/')
	}
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.session) {
			throw redirect(303, '/login')
		}

		const formData = Object.fromEntries(await request.formData()) as any

		await db.user.create({
			data: {
				...formData,
				birthdate: new Date(formData.birthdate),
				gender: formData.gender as Gender,
				authId: locals.session.user.id
			}
		})

		throw redirect(303, '/')
	}
}
