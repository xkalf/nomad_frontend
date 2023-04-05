import db from '$lib/db'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.user.role !== 'Admin') {
		throw redirect(303, '/')
	}

	const getUsers = async () => {
		return await db.user.findMany({
			orderBy: {
				firstname: 'desc'
			},
			include: {
				sessions: true
			}
		})
	}

	return {
		users: getUsers()
	}
}
