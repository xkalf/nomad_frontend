import db from '$lib/db'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ params: { id } }) => {
	const session = await db.session.findUnique({
		where: {
			id: +id
		},
		include: {
			solves: {
				orderBy: {
					createdAt: 'asc'
				},
				where: {
					deleted: null
				}
			}
		}
	})

	return new Response(JSON.stringify({ session }))
}
