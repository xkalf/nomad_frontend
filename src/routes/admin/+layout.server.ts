import db from '$lib/db'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		redirect(303, '/login')
	}

	if (locals.user.role !== 'Admin') {
		redirect(303, '/')
	}

	const res = await db.user.findMany({
		orderBy: {
			firstname: 'desc'
		},
		include: {
			sessions: {
				orderBy: [
					{
						main: 'desc'
					},
					{
						name: 'desc'
					}
				],
				include: {
					_count: {
						select: {
							solves: true
						}
					}
				}
			}
		}
	})

	return {
		users: res
	}
}
